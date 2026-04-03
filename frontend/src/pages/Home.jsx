import { useNavigate } from 'react-router'
import bgImage from '../assets/images/home-bg.jpg';
import { useForm } from 'react-hook-form';
import TravelTypeSelect from '../components/home/TravelTypeSelect';
import DestinationSelect from '../components/home/DestinationSelect';
import TextField from '@mui/material/TextField';
import { useFilters } from '../stores/filters.store';

function Home() {

  const navigate = useNavigate();
  const { toggleCities, toggleTravelTypes, clearFilters } = useFilters();
  async function handleSearch({ destination, type }) {
    clearFilters();
    toggleTravelTypes(type)
    if (destination) {
      toggleCities(destination)
    }
    navigate(`/results`);
  }

  const { handleSubmit, control } = useForm();

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
          <TravelTypeSelect control={control} />
          <DestinationSelect control={control} />
          <TextField label="Anything else?" variant="outlined" />
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
