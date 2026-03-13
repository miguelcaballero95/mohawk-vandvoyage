import { useState, useEffect } from "react"
import { IoChevronBackSharp, IoSearchOutline } from "react-icons/io5"
import { Link } from "react-router"
import banner from '../assets/images/resultsheader.jpg'
import { fetchTrips } from "../data"
import { TripCard } from "../components/TripCard"

export const Results = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips().then(data => {
      setTrips(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="text-blue-tertiary">
      <div className="px-8 pt-8 flex justify-between items-center">
        <Link to="/">
          <IoChevronBackSharp size={18} />
        </Link>
        <h1 className="text-lg">Search Results</h1>
        <button>
          <IoSearchOutline size={20} />
        </button>
      </div>
      <div className="mt-2">
        <img src={banner} alt="Results" className="w-full h-56 object-cover object-bottom" />
      </div>
      <div className="px-8 py-4">
        <h2 className="font-semibold">Best Value Trips</h2>
        <div className="mt-4 flex flex-col gap-4">
          {loading ? (
            <p className="text-gray-400 text-sm">Loading destinations...</p>
          ) : (
            trips.map(trip => <TripCard key={trip.id} {...trip} />)
          )}
        </div>
      </div>
    </div>
  )
}
