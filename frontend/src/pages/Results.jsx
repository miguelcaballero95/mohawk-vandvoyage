import { IoChevronBackSharp, IoSearchOutline } from "react-icons/io5"
import { Link } from "react-router"
import banner from '../assets/images/resultsheader.jpg'
import { fetchTrips } from "../data"
import { TripCard } from "../components/TripCard"
import Nav from "../components/Nav"

export const Results = () => {

  const trips = fetchTrips();

  return (
    <div className="grow h-full lg:flex">
      <div className="mt-2 lg:w-1/2">
        <img src={banner} alt="Results" className="w-full h-56 lg:h-full object-cover object-bottom" />
      </div>
      <div className="p-4 lg:w-1/2">
        <div>
          <h2 className="font-semibold lg:font-bold text-lg lg:text-xl">Best Value Trips - From New York</h2>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {trips.map(trip => <TripCard key={trip.id} {...trip} />)}
        </div>
      </div>
    </div>
  )
}