import { useEffect, useState } from 'react';
import banner from '../assets/images/resultsheader.jpg'
import TripsSkeleton from '../components/TripsSkeleton';
import TripCard from '../components/TripCard';
import { getActivitiesBy, getCities, getTravelTypes } from '../data';
import { useSearchParams } from 'react-router';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

export const Results = () => {

  const [searchParams] = useSearchParams();
  const origin = searchParams.get("origin");
  const category = searchParams.get("type");

  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 5;

  function fetchTripDetails(tripId) {
    const activity = trips.find(t => t.id === tripId)
    setCurrentTrip(activity);
  }

  useEffect(() => {
    async function fetchTrips() {
      try {

        // Use this to fetch data from Amadeus and Gemini
        // const data = await getTrips(origin);
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
  const city = getCities().filter(city => {
    return city.id === origin;
  })[0];

  return (
    <div className="grow h-full lg:flex">
      <div className="mt-2 lg:w-1/2">
        <img
          src={banner}
          alt="Results"
          className="w-full h-56 lg:h-full object-cover object-bottom"
        />
      </div>

      {!currentTrip &&
        <div className="pl-8 px-30 lg:w-1/2">
          <h2 className="font-semibold lg:font-bold text-lg lg:text-xl">
            Best Trips - {city.city}
          </h2>

          <div className="flex flex-col gap-4 grow">
            {loading ? (
              <TripsSkeleton />
            ) : (
              currentTrips.map(trip => <TripCard key={trip.id} trip={trip} onClick={() => fetchTripDetails(trip.id)} />)
            )}
          </div>
          {!loading && trips.length > 0 && (
            <div className="mt-8 flex justify-center items-center gap-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-4 py-2 bg-blue-primary text-white rounded disabled:opacity-50 cursor-pointer"
              >
                Previous
              </button>

              <span className="font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-4 py-2 bg-blue-primary text-white rounded disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </div>}
      {currentTrip &&
        <div className="pl-8 px-30 lg:w-1/2">
          <p className='underline text-sm mb-2 cursor-pointer' onClick={() => setCurrentTrip(null)}>
            Go back to results
          </p>
          <h2 className="font-semibold lg:font-bold text-lg lg:text-xl">
            {currentTrip.name}
          </h2>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {currentTrip.categories.map(cat => {
              const category = getTravelTypes().find(type => type.id === cat);
              return <span key={cat} className="text-xs text-orange-primary px-2 py-0.5 rounded-full bg-orange-primary/20 capitalize">{category.type}</span>
            })}
          </div>
          <div className='pt-6'>
            <p>Minimum duration: {currentTrip.minimumDuration}</p>
            <p>Price: ${currentTrip.price.amount}</p>
          </div>
          <div className='py-4 text-justify' dangerouslySetInnerHTML={{ __html: currentTrip.description }}></div>
          <div className='mb-4'>
            <Splide aria-label="Activity Images" options={{
              type: 'loop',
            }}>
              {currentTrip.pictures.map(image => (
                <SplideSlide key={image}>
                  <img src={image} />
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>}
    </div>
  );
};