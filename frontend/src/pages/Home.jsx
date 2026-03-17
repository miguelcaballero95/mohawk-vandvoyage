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
    <div className="w-full h-full min-h-screen p-8" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <header className="flex justify-between items-center">
        <img src={logo} alt="Vandvoyage logo" className="w-40" />
        {/* <button className="bg-white rounded-full p-2">
          <FiMenu size={24} />
        </button> */}
      </header>
      <main className="pt-14 lg:pt-24">
        <div>
          <p className="text-white text-center text-4xl lg:text-5xl text-shadow-black font-bold">
            Find Your Next <br />
            <span className="underline decoration-orange-primary underline-offset-8">Adventure</span>
          </p>
        </div>
        <div className='mt-12 grid grid-cols-3 gap-6 max-w-sm mx-auto lg:max-w-5xl lg:bg-white lg:p-4 lg:rounded-2xl'>
          <p className='bg-white px-3 py-4 rounded-xl col-span-3 lg:col-span-1 lg:border lg:border-gray-300'>
            <label className='block mb-2 lg:mb-1 text-gray-500 text-sm' htmlFor="travel-type">What are you looking for?</label>
            <select className='w-full text-blue-tertiary outline-0' name="travel_type" id="travel-type">
              {travelTypes.map(type => <option key={type}>{type}</option>)}
            </select>
          </p>
          <p className='bg-white px-3 py-4 rounded-xl col-span-3 lg:col-span-1 lg:border lg:border-gray-300'>
            <label className='block mb-2 text-gray-500 text-sm' htmlFor="where-from">Where from?</label>
            <input type="text" className='w-full text-blue-tertiary outline-0' name="from" id="where-from" placeholder='New York' />
          </p>
          <p className='bg-white px-3 py-4 rounded-xl col-span-3 lg:col-span-1 lg:border lg:border-gray-300'>
            <label className='block mb-2 text-gray-500 text-sm' htmlFor="additional-information">Anything else?</label>
            <input
              type="text"
              className='w-full text-blue-tertiary outline-0'
              name="additional_information"
              id="additional-information"
              placeholder='Only pet friendly options' />
          </p>
          <button className='bg-orange-primary text-white py-4 rounded-xl font-bold col-span-3' onClick={handleSearch}>
            Surprise Me!
          </button>
        </div>
      </main>
    </div>
  )
}

export default Home
