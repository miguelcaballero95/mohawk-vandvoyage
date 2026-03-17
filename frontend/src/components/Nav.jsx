import { FiMenu } from 'react-icons/fi'
import logo from '../assets/images/logoblue.svg'
import { Link } from 'react-router'

const Nav = () => {
  return (
    <header className="flex justify-between items-center max-w-7xl mx-auto p-4 md:p-8 text-blue-tertiary w-full">
      <p>
        <Link to="/">
          <img src={logo} alt="Vandvoyage logo" className="w-40" />
        </Link>
      </p>
      <div>
        <button className="bg-white rounded-full p-2 md:hidden">
          <FiMenu size={24} />
        </button>
        <div className='hidden md:flex md:gap-4 text-lg '>
          <Link to="/" className='font-semibold'>Explore</Link>
          <Link to="/login" className='font-semibold'>Sign In</Link>
        </div>
      </div>
    </header>
  )
}

export default Nav
