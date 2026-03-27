import { useEffect, useState } from 'react';
import TripsSkeleton from '../components/TripsSkeleton';
import TripCard from '../components/TripCard';
import { getActivitiesBy, getCities, getTravelTypes } from '../data';
import { useSearchParams } from 'react-router';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import FiltersSidebar from '../components/FiltersSidebar';
import { FiFilter, FiChevronLeft, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';

export const Results = () => {

  const [searchParams] = useSearchParams();
  const origin = searchParams.get("origin");
  const category = searchParams.get("type");

  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const tripsPerPage = 4;

  function fetchTripDetails(tripId) {
    const activity = trips.find(t => t.id === tripId)
    setCurrentTrip(activity);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    async function fetchTrips() {
      try {
        setLoading(true);
        const data = getActivitiesBy(origin, category);

        if (data.error) {
          console.error(data.message);
        } else {
          setTrips(data);
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrips();
  }, [origin, category]);

  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);
  const totalPages = Math.ceil(trips.length / tripsPerPage);
  const city = getCities().find(c => c.id === origin) || { city: origin };

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
                  <img src={image} className="w-full lg:h-[calc(100vh-120px)] min-h-100 max-h-175 object-cover" alt={`${currentTrip.name} ${index + 1}`} />
                </SplideSlide>
              ))}
            </Splide>
          </div>}
        {!currentTrip &&
          <div className="relative h-64 lg:h-[calc(100vh-120px)] min-h-100 max-h-175 w-full overflow-hidden rounded-b-3xl lg:rounded-3xl shadow-xl group top-4">
            <img
              src={city.image}
              alt="Results"
              className="w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
            />
          </div>}
      </div>
      <div className="flex-1 lg:overflow-y-auto">
        {!currentTrip ? (
          <div className="px-4 lg:px-8 py-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-blue-tertiary tracking-tight">
                  Discover {city.city}
                </h1>
                <p className="text-gray-500 text-sm font-medium mt-0.5">Found {trips.length} experiences for you.</p>
              </div>
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center justify-center gap-2 px-5 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold text-blue-tertiary hover:border-blue-primary hover:text-blue-primary transition-all shadow-sm active:scale-95"
              >
                <FiFilter className="text-blue-primary" />
                <span>Filters</span>
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
                  <p className="text-gray-400 font-medium text-sm">No activities found matching your criteria.</p>
                  <button onClick={() => window.location.reload()} className="mt-4 text-blue-primary text-sm font-bold underline">Clear all filters</button>
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
                  <span className="text-xs font-bold text-blue-tertiary">
                    {currentPage}
                  </span>
                  <span className="text-[10px] font-bold text-gray-300 uppercase">
                    /
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    {totalPages}
                  </span>
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
            <button
              className='flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-blue-primary transition-colors mb-6 group uppercase tracking-wider cursor-pointer'
              onClick={() => setCurrentTrip(null)}
            >
              <FiChevronLeft className="transition-transform group-hover:-translate-x-1" />
              Back to results
            </button>
            <h2 className="text-3xl font-bold text-blue-tertiary tracking-tight leading-tight mb-4">
              {currentTrip.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {currentTrip.categories.map(cat => {
                const category = getTravelTypes().find(type => type.id === cat);
                return (
                  <span key={cat} className="text-[10px] font-bold tracking-wider uppercase text-orange-primary px-3 py-1 rounded-full bg-orange-primary/10">
                    {category?.type || cat}
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
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Duration</p>
                    <p className="text-xs font-bold text-blue-tertiary">{currentTrip.minimumDuration}</p>
                  </div>
                </div>}
              <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-primary/10 flex items-center justify-center text-orange-primary">
                  <FiDollarSign size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Price</p>
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