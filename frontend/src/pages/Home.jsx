import { useNavigate } from 'react-router'
import bgImage from '../assets/images/home-bg.jpg';
import { useForm } from 'react-hook-form';
import TravelTypeSelect from '../components/home/TravelTypeSelect';
import DestinationSelect from '../components/home/DestinationSelect';
import { useLanguage } from '../context/LanguageContext';
import { useFilters } from '../stores/filters.store';

function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toggleCities, toggleTravelTypes, clearFilters } = useFilters();

  const { handleSubmit, control } = useForm();

  async function handleSearch({ destination, type }) {
    // Reset previous filters and apply the new search selection
    clearFilters();
    if (type) toggleTravelTypes(type);
    if (destination) toggleCities(destination);
    navigate(`/results`);
  }

  return (
    <>
      <div
        className="w-full h-full absolute inset-0 -z-10"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      </div>
      <main className="pt-14 lg:pt-16 lg:max-w-4xl xl:max-w-7xl mx-auto">
        <div>
          <p className="text-white text-center text-4xl lg:text-5xl text-shadow-black font-bold">
            {t('findNextAdventure')} <br />
            <span className="underline decoration-orange-primary underline-offset-8">{t('adventure')}</span>
          </p>
        </div>
        <form onSubmit={handleSubmit(handleSearch)} className='mt-12 grid grid-cols-3 gap-6 max-w-sm mx-auto lg:max-w-5xl lg:bg-white lg:p-4 lg:rounded-2xl'>
          {/* Travel type autocomplete with MUI */}
          <p className='bg-white px-3 py-4 rounded-xl col-span-3 lg:col-span-1 lg:border lg:border-gray-300'>
            <TravelTypeSelect control={control} />
          </p>
          {/* Destination autocomplete with MUI */}
          <p className='bg-white px-3 py-4 rounded-xl col-span-3 lg:col-span-1 lg:border lg:border-gray-300'>
            <DestinationSelect control={control} />
          </p>
          <p className='bg-white px-3 py-4 rounded-xl col-span-3 lg:col-span-1 lg:border lg:border-gray-300'>
            <label className='block mb-2 text-gray-500 text-sm' htmlFor="additional-information">{t('anythingElse')}</label>
            <input
              type="text"
              className='w-full text-blue-tertiary outline-0'
              name="additional_information"
              id="additional-information"
              placeholder={t('anythingElsePlaceholder')}
            />
          </p>
          <button type='submit'
            className='bg-orange-primary text-white py-4 rounded-xl font-bold col-span-3 cursor-pointer hover:bg-orange-secondary transition-colors duration-300'>
            {t('surpriseMe')}
          </button>
        </form>
      </main>
    </>
  )
}

export default Home
