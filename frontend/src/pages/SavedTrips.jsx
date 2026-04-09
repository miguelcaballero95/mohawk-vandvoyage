import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FiBookmark, FiMapPin, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../stores/auth.store';
import { useLanguage } from '../context/LanguageContext';
import { apiUrl } from '../config/api';

const SavedTrips = () => {
  const { user, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [savedTrips, setSavedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Fetch saved trips
  useEffect(() => {
    if (!user) return;
    user.getIdToken().then(idToken => {
      fetch(apiUrl(`/api/saved-trips?idToken=${idToken}`))
        .then(r => r.json())
        .then(data => {
          if (data.savedTrips) setSavedTrips(data.savedTrips);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    });
  }, [user]);

  const handleRemove = async (activityId) => {
    if (removingId) return;
    setRemovingId(activityId);
    try {
      const idToken = await user.getIdToken();
      await fetch(apiUrl(`/api/saved-trips/${activityId}`), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      setSavedTrips(prev => prev.filter(s => s.activity_id !== activityId));
    } catch (err) {
      console.error('Remove saved trip error:', err);
    } finally {
      setRemovingId(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="grow flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="grow px-4 lg:px-8 py-8 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-8">
        <FiBookmark size={22} className="text-orange-primary" fill="currentColor" />
        <h1 className="text-2xl lg:text-3xl font-bold text-blue-tertiary tracking-tight">
          {t('savedTrips')}
        </h1>
      </div>

      {savedTrips.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <FiBookmark size={36} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 font-medium">{t('noSavedTrips')}</p>
          <button
            onClick={() => navigate('/results')}
            className="mt-4 text-orange-primary text-sm font-bold underline underline-offset-2"
          >
            {t('exploreExperiences')}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {savedTrips.map((savedTrip) => {
            const { _id, activity_id, activity_snapshot } = savedTrip;
            const { name, city, price, thumbnail, categories, minimumDuration } = activity_snapshot;
            return (
              <div
                key={_id}
                className="flex shadow-md border border-gray-100 rounded-2xl p-3 gap-3 bg-white hover:shadow-lg transition-shadow"
              >
                {/* Thumbnail */}
                <div className="shrink-0">
                  {thumbnail ? (
                    <img src={thumbnail} className="h-24 w-24 object-cover rounded-xl" alt={name} />
                  ) : (
                    <div className="h-24 w-24 rounded-xl bg-gray-100 flex items-center justify-center">
                      <FiMapPin className="text-gray-300" size={24} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <FiMapPin size={10} className="text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{city}</span>
                  </div>
                  <p className="font-semibold text-base leading-tight truncate">{name}</p>
                  {minimumDuration && (
                    <p className="text-xs text-gray-400 mt-0.5">{minimumDuration}</p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {categories.slice(0, 2).map(cat => (
                      <span key={cat} className="text-[10px] font-bold text-orange-primary px-2 py-0.5 rounded-full bg-orange-primary/10 capitalize">
                        {t(cat) !== cat ? t(cat) : cat}
                      </span>
                    ))}
                    {categories.length > 2 && (
                      <span className="text-[10px] font-bold text-gray-400 px-2 py-0.5 rounded-full bg-gray-100">+{categories.length - 2}</span>
                    )}
                  </div>
                </div>

                {/* Price + Remove */}
                <div className="flex flex-col justify-between items-end shrink-0 ml-2">
                  <button
                    onClick={() => handleRemove(activity_id)}
                    disabled={removingId === activity_id}
                    className="p-1.5 text-gray-300 hover:text-red-400 transition-colors cursor-pointer disabled:opacity-50"
                    title={t('remove')}
                  >
                    <FiTrash2 size={15} />
                  </button>
                  <p className="text-lg font-black text-blue-tertiary mr-2">
                    ${Math.round(price.amount)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedTrips;
