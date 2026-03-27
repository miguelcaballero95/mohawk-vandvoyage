import { useNavigate } from 'react-router'
import bgImage from '../assets/images/home-bg.jpg';
import { getTravelTypes, getCities } from '../data';
import { useForm } from 'react-hook-form';

function Home() {

  const cities = getCities();
  const travelTypes = getTravelTypes();
  const navigate = useNavigate();

  async function handleSearch(data) {
    const searchParams = new URLSearchParams(data);
    const queryString = searchParams.toString();
    navigate(`/results?${queryString}`);
  }

  const initialValues = {
    type: 'adventure-travel',
    origin: 'toronto',
  };

  const { register, handleSubmit } = useForm({ defaultValues: initialValues });

  return (
    <>
      <div
        className="w-full h-full absolute inset-0 -z-10"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      </div>
      <main className="pt-14 lg:pt-16 lg:max-w-4xl xl:max-w-7xl mx-auto">
        <div>
          <p className="text-white text-center text-4xl lg:text-5xl text-shadow-black font-bold">
            Find Your Next <br />
            <span className="underline decoration-orange-primary underline-offset-8">Adventure</span>
          </p>
        </div>
        <form onSubmit={handleSubmit(handleSearch)} className='mt-12 grid grid-cols-3 gap-6 max-w-sm mx-auto lg:max-w-5xl lg:bg-white lg:p-4 lg:rounded-2xl'>
          <p className='bg-white px-3 py-4 rounded-xl col-span-3 lg:col-span-1 lg:border lg:border-gray-300'>
            <label className='block mb-2 lg:mb-1 text-gray-500 text-sm' htmlFor="travel-type">What are you looking for?</label>
            <select
              className='w-full text-blue-tertiary outline-0'
              name="travel_type"
              id="travel-type"
              {...register('type', { required: "Field is required" })}
            >
              {travelTypes.map(({ id, type }) => <option key={id} value={id}>{type}</option>)}
            </select>
          </p>
          <p className='bg-white px-3 py-4 rounded-xl col-span-3 lg:col-span-1 lg:border lg:border-gray-300'>
            <label className='block mb-2 text-gray-500 text-sm' htmlFor="origin">Where?</label>
            <select
              className='w-full text-blue-tertiary outline-0'
              name="origin"
              id="origin"
              {...register('origin', { required: "Field is required" })}
            >
              {cities.map(({ id, city }) => <option key={id} value={id}>{city}</option>)}
            </select>
          </p>
          <p className='bg-white px-3 py-4 rounded-xl col-span-3 lg:col-span-1 lg:border lg:border-gray-300'>
            <label className='block mb-2 text-gray-500 text-sm' htmlFor="additional-information">Anything else?</label>
            <input
              type="text"
              className='w-full text-blue-tertiary outline-0'
              name="additional_information"
              id="additional-information"
              placeholder='Pet friendly, Hiking...'
            />
          </p>
          <button type='submit'
            className='bg-orange-primary text-white py-4 rounded-xl font-bold col-span-3 cursor-pointer hover:bg-orange-secondary transition-colors duration-300'>
            Surprise Me!
          </button>
        </form>
      </main>
    </>
  )
}

export default Home
