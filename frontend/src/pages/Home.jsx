import { FiMenu } from 'react-icons/fi'
import logo from '../assets/images/logoblue.svg'
import bgImage from '../assets/images/home-bg.jpg'
import { useNavigate } from 'react-router'
import { fetchTravelTypes } from '../data';

function Home() {

  let navigate = useNavigate();
  const travelTypes = fetchTravelTypes();

  function handleSearch() {
    // TODO: Implement search functionality
    navigate('/results');
  }
  return (
    <div className="w-full h-screen p-8" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <header className="flex justify-between items-center">
        <img src={logo} alt="Vandvoyage logo" className="w-40" />
        <button className="bg-white rounded-full p-2">
          <FiMenu size={24} />
        </button>
      </header>
      <main className="pt-20">
        <div>
          <p className="text-white text-center text-4xl text-shadow-black font-bold">
            Find Your Next <br />
            <span className="underline decoration-orange-primary underline-offset-8">Adventure</span>
          </p>
        </div>
        <div className='mt-12 flex flex-col gap-6'>
          <p className='bg-white px-3 py-4 rounded-xl'>
            <label className='block mb-2 text-gray-500 text-sm' htmlFor="how-do-you-feel">What are you looking for?</label>
            <select className='w-full text-blue-tertiary outline-0' name="feel" id="how-do-you-feel">
              {travelTypes.map(type => <option key={type}>{type}</option>)}
            </select>
          </p>
          <p className='bg-white px-3 py-4 rounded-xl'>
            <label className='block mb-2 text-gray-500 text-sm' htmlFor="where-from">Where from?</label>
            <select className='w-full text-blue-tertiary outline-0' name="from" id="where-from">
              <option>New York</option>
              <option>Toronto</option>
            </select>
          </p>
          <p className='bg-white px-3 py-4 rounded-xl'>
            <label className='block mb-2 text-gray-500 text-sm' htmlFor="reservation-type">Type of reservation</label>
            <select className='w-full text-blue-tertiary outline-0' name="reservation" id="reservation-type">
              <option>Hotel</option>
            </select>
          </p>
          <button className='bg-orange-primary text-white py-4 rounded-xl font-bold' onClick={handleSearch}>
            Surprise Me!
          </button>
        </div>
      </main>
    </div>
  )
}

export default Home
