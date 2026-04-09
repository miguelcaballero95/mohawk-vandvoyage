import { useEffect, useState } from 'react';
import TripsSkeleton from '../components/TripsSkeleton';
import TripCard from '../components/TripCard';
import { getActivitiesBy, getCities, getTravelTypes } from '../data';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import FiltersSidebar from '../components/FiltersSidebar';
import { FiFilter, FiChevronLeft, FiClock, FiDollarSign, FiBookmark } from 'react-icons/fi';
import { useFilters } from '../stores/filters.store';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../stores/auth.store';
import { useNavigate } from 'react-router';

export const Results = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cities, travelTypes, minPrice, maxPrice } = useFilters();

  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [savedIds, setSavedIds] = useState(new Set());
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState('');
  const tripsPerPage = 4;

  function fetchTripDetails(tripId) {
    const activity = trips.find(t => t.id === tripId)
    setCurrentTrip(activity);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Load user's saved trip IDs when they're logged in
  useEffect(() => {
    if (!user) return;
    user.getIdToken().then(idToken => {
      fetch(`/api/saved-trips?idToken=${idToken}`)
        .then(r => r.json())
        .then(data => {
          if (data.savedTrips) {
            setSavedIds(new Set(data.savedTrips.map(s => s.activity_id)));
          }
        })
        .catch(err => console.error('Failed to load saved trips:', err));
    });
  }, [user]);

  const MAX_SAVED = 5;

  const handleSave = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!currentTrip || saveLoading) return;
    setSaveError('');
    setSaveLoading(true);
    try {
      const idToken = await user.getIdToken();
      const isSaved = savedIds.has(currentTrip.id);

      if (isSaved) {
        await fetch(`/api/saved-trips/${currentTrip.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });
        setSavedIds(prev => { const next = new Set(prev); next.delete(currentTrip.id); return next; });
      } else {
        if (savedIds.size >= MAX_SAVED) {
          setSaveError(t('maxSavedReached'));
          return;
        }
        console.log('Saving trip — name:', currentTrip.name, '| id:', currentTrip.id, '| type:', typeof currentTrip.id);
        const res = await fetch('/api/saved-trips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idToken,
            activity_id: currentTrip.id,
            activity_snapshot: {
              name: currentTrip.name,
              city: currentTrip.city,
              price: currentTrip.price,
              thumbnail: currentTrip.pictures?.[0] || null,
              categories: currentTrip.categories,
              minimumDuration: currentTrip.minimumDuration || null,
            },
          }),
        });
        if (res.status === 409) {
          // Already saved in DB but not reflected in local state — sync it
          setSavedIds(prev => new Set([...prev, currentTrip.id]));
          return;
        }
        if (!res.ok) {
          const data = await res.json();
          setSaveError(data.error || t('maxSavedReached'));
          return;
        }
        setSavedIds(prev => new Set([...prev, currentTrip.id]));
      }
    } catch (err) {
      console.error('Save trip error:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  // Refetch whenever filter state changes
  useEffect(() => {
    async function fetchTrips() {
      try {
        setLoading(true);
        const data = getActivitiesBy(cities, travelTypes, minPrice, maxPrice);
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrips();
  }, [cities, travelTypes, minPrice, maxPrice]);

  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);
  const totalPages = Math.ceil(trips.length / tripsPerPage);

  // Count active filters to show badge on filter button
  const activeFiltersCount = cities.length + travelTypes.length + (minPrice ? 1 : 0) + (maxPrice ? 1 : 0);

  return (
    <div className="grow h-full lg:flex bg-gray-50/30 lg:p-4 lg:gap-4">
      <FiltersSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      <div className="lg:w-5/12 xl:w-1/2">
        {currentTrip &&
          <div className='mb-8 rounded-2xl overflow-hidden shadow-xl border border-white'>
            <Splide aria-label="Activity Images" options={{
              type: 'loop',
              gap: '1rem',
              arrows: currentTrip.pictures.length > 1,
              pagination: currentTrip.pictures.length > 1,
            }}>
              {currentTrip.pictures.map((image, index) => (
                <SplideSlide key={index}>
                  <img src={image}
                    className="w-full lg:h-[calc(100vh-120px)] min-h-100 max-h-175 object-cover"
                    alt={`${currentTrip.name} ${index + 1}`} />
                </SplideSlide>
              ))}
            </Splide>
          </div>}
        {!currentTrip &&
          <div className="relative h-64 lg:h-[calc(100vh-120px)] min-h-100 max-h-175 w-full overflow-hidden rounded-b-3xl lg:rounded-3xl shadow-xl group top-4">
            <img
              src="https://thetravelexpert.ie/wp-content/uploads/2021/07/V3.0.jpg"
              alt="Results"
              className="w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
            />
          </div>}
      </div>
      <div className="flex-1 lg:overflow-y-auto">
        {!currentTrip ? (
          <div className="px-4 lg:px-8 py-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-blue-tertiary tracking-tight">
                  {t('discover')}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <p className="text-gray-500 text-sm font-medium">
                    {t('foundExperiences', { count: trips.length })}
                  </p>
                  {/* Active filter chips */}
                  {activeFiltersCount > 0 && (
                    <div className="flex flex-wrap gap-1.5 ml-1">
                      {cities.map(cityId => (
                        <button key={cityId} onClick={() => setIsFilterOpen(true)} className="text-[10px] font-bold px-2 py-0.5 bg-blue-primary/5 text-blue-primary rounded-full border border-blue-primary/10 hover:bg-blue-primary/10 transition-colors">
                          {getCities().find(c => c.id === cityId)?.label}
                        </button>
                      ))}
                      {travelTypes.map(typeId => (
                        <button key={typeId} onClick={() => setIsFilterOpen(true)} className="text-[10px] font-bold px-2 py-0.5 bg-orange-primary/5 text-orange-primary rounded-full border border-orange-primary/10 hover:bg-orange-primary/10 transition-colors">
                          {t(typeId)}
                        </button>
                      ))}
                      {minPrice && (
                        <button onClick={() => setIsFilterOpen(true)} className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors">
                          {t('min')}: ${minPrice}
                        </button>
                      )}
                      {maxPrice && (
                        <button onClick={() => setIsFilterOpen(true)} className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors">
                          {t('max')}: ${maxPrice}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* Filter button with active count badge */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="relative flex items-center justify-center gap-2 px-5 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold text-blue-tertiary hover:border-blue-primary hover:text-blue-primary transition-all shadow-sm active:scale-95"
              >
                <FiFilter className="text-blue-primary" />
                <span>{t('filters')}</span>
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-primary text-white text-[10px] flex items-center justify-center rounded-full shadow-lg ring-2 ring-white">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {loading ? (
                <TripsSkeleton />
              ) : trips.length > 0 ? (
                currentTrips.map(trip => (
                  <div key={trip.id} className="transition-transform duration-300 hover:-translate-y-1">
                    <TripCard trip={trip} onClick={() => fetchTripDetails(trip.id)} />
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
                  <p className="text-gray-400 font-medium text-sm">{t('noActivities')}</p>
                  <button onClick={() => window.location.reload()} className="mt-4 text-blue-primary text-sm font-bold underline">
                    {t('clearAllFilters')}
                  </button>
                </div>
              )}
            </div>
            {!loading && trips.length > 0 && (
              <div className="mt-8 mb-8 flex justify-center items-center gap-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage(prev => prev - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-2.5 bg-white border border-gray-200 text-blue-tertiary rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-primary hover:text-blue-primary transition-all shadow-sm"
                >
                  <FiChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-1.5 px-4 py-1.5 bg-white rounded-full border border-gray-100 shadow-sm">
                  <span className="text-xs font-bold text-blue-tertiary">{currentPage}</span>
                  <span className="text-[10px] font-bold text-gray-300 uppercase">/</span>
                  <span className="text-xs font-bold text-gray-400">{totalPages}</span>
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(prev => prev + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-2.5 bg-white border border-gray-200 text-blue-tertiary rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-primary hover:text-blue-primary transition-all shadow-sm rotate-180"
                >
                  <FiChevronLeft size={18} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="px-4 lg:px-8 py-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <button
                className='flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-blue-primary transition-colors group uppercase tracking-wider cursor-pointer'
                onClick={() => { setCurrentTrip(null); setSaveError(''); }}
              >
                <FiChevronLeft className="transition-transform group-hover:-translate-x-1" />
                {t('backToResults')}
              </button>
              <div className="flex flex-col items-end gap-1">
                <button
                  onClick={handleSave}
                  disabled={saveLoading}
                  className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest cursor-pointer group transition-colors ${
                    currentTrip && savedIds.has(currentTrip.id)
                      ? 'text-orange-primary'
                      : 'text-gray-400 hover:text-orange-primary'
                  }`}
                >
                  <FiBookmark
                    size={14}
                    className="transition-transform group-hover:scale-110"
                    fill={currentTrip && savedIds.has(currentTrip.id) ? 'currentColor' : 'none'}
                  />
                  {currentTrip && savedIds.has(currentTrip.id) ? t('saved') : t('saveExperience')}
                </button>
                {saveError && (
                  <p className="text-[10px] text-red-400 font-medium text-right max-w-32">{saveError}</p>
                )}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-blue-tertiary tracking-tight leading-tight mb-4">
              {currentTrip.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {currentTrip.categories.map(cat => {
                const category = getTravelTypes().find(type => type.id === cat);
                return (
                  <span key={cat} className="text-[10px] font-bold tracking-wider uppercase text-orange-primary px-3 py-1 rounded-full bg-orange-primary/10">
                    {/* Use translation if available, fall back to label */}
                    {t(cat) !== cat ? t(cat) : category?.label || cat}
                  </span>
                )
              })}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {currentTrip.minimumDuration &&
                <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-primary/10 flex items-center justify-center text-blue-primary">
                    <FiClock size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{t('duration')}</p>
                    <p className="text-xs font-bold text-blue-tertiary">{currentTrip.minimumDuration}</p>
                  </div>
                </div>}
              <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-primary/10 flex items-center justify-center text-orange-primary">
                  <FiDollarSign size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{t('price')}</p>
                  <p className="text-xs font-bold text-blue-tertiary">${currentTrip.price.amount}</p>
                </div>
              </div>
            </div>
            <div className='py-6'>
              <div className='text-neutral-charcoal leading-relaxed text-base' dangerouslySetInnerHTML={{ __html: currentTrip.description }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
