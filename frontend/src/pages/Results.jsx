import { useEffect, useState } from 'react';
import banner from '../assets/images/resultsheader.jpg'
import TripsSkeleton from '../components/TripsSkeleton';
import TripCard from '../components/TripCard';
import { getCities, getTrips } from '../data';
import { useSearchParams } from 'react-router';

export const Results = () => {
  const [searchParams] = useSearchParams();
  const origin = searchParams.get("origin");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 5;

  useEffect(() => {
    async function fetchTrips() {
      try {
        const data = await getTrips(origin);
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrips();
  }, [origin]);

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

      <div className="pl-8 px-30 lg:w-1/2">
        <h2 className="font-semibold lg:font-bold text-lg lg:text-xl">
          Best Trips - {city.city}
        </h2>

        <div className="flex flex-col gap-4 grow">
          {loading ? (
            <TripsSkeleton />
          ) : (
            currentTrips.map(trip => <TripCard key={trip.id} trip={trip} />)
          )}
        </div>
        {!loading && trips.length > 0 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 bg-blue-primary text-white rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 bg-blue-primary text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};