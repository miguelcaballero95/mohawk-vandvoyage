import { FiMenu, FiBookmark } from 'react-icons/fi'
import logo from '../assets/images/logoblue.svg'
import { Link, useNavigate } from 'react-router'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../stores/auth.store'

const Nav = () => {
  const { t, language, changeLanguage, LANGUAGES, LANGUAGE_LABELS } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center max-w-7xl mx-auto p-4 md:p-8 text-blue-tertiary w-full">
      <p>
        <Link to="/">
          <img src={logo} alt="Vandvoyage logo" className="w-40" />
        </Link>
      </p>
      <div className="flex items-center gap-4">
        {/* Language selector — simple button group for EN / ES / FR */}
        <div className="flex rounded-full border border-gray-200 overflow-hidden text-xs font-bold">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`px-3 py-1.5 transition-colors cursor-pointer ${language === lang
                  ? 'bg-blue-primary text-white'
                  : 'bg-white text-blue-tertiary hover:bg-gray-100'
                }`}
            >
              {LANGUAGE_LABELS[lang]}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button className="bg-white rounded-full p-2 md:hidden">
          <FiMenu size={24} />
        </button>

        {/* Desktop nav links */}
        <div className='hidden md:flex md:items-center md:gap-4 text-lg'>
          <Link to="/" className='font-semibold'>{t('explore')}</Link>
          {user ? (
            <>
              <Link to="/saved" className='flex items-center gap-1.5 font-semibold hover:text-orange-primary transition-colors' title={t('savedTrips')}>
                <FiBookmark size={18} />
                <span>{t('savedTrips')}</span>
              </Link>
              <button onClick={handleSignOut} className='font-semibold cursor-pointer hover:text-orange-primary transition-colors'>
                {t('signOut')}
              </button>
            </>
          ) : (
            <Link to="/login" className='font-semibold'>{t('signIn')}</Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Nav
