import r1 from '../assets/images/results1.jpg'
import logo from '../assets/images/logowhite.svg'

const Login = () => {
  return (
    <div className="grow px-4 lg:px-0 py-2 lg:py-0 flex flex-col lg:flex-row">
      <div
        className="hidden lg:flex lg:items-center lg:justify-center lg:w-1/2"
        style={{ backgroundImage: `linear-gradient(rgba(10, 34, 91, 0.9), rgba(10, 34, 91, 0.9)), url(${r1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div>
          <img src={logo} alt="Vandvoyage Logo" className='w-90' />
          <p className='text-white mt-6 text-sm text-center'>
            Your journey begins with a single search.
          </p>
        </div>
      </div>
      <div className="grow lg:w-1/2 flex flex-col justify-center gap-12 lg:gap-8">
        <div>
          <h1 className="text-center font-bold text-xl lg:text-3xl underline decoration-orange-primary underline-offset-8">Welcome Back</h1>
          <form className="mt-4 lg:mt-8 max-w-xs mx-auto">
            <label htmlFor="user-email" className="block text-gray-600 text-sm mb-2">Email</label>
            <input
              type="text"
              id="user-email"
              name="user_email"
              className="block placeholder:text-gray-500 border border-gray-300 rounded-xl w-full py-4 px-2"
              placeholder="Enter your email"
            />
            <label htmlFor="user-password" className="block text-gray-600 text-sm mt-4 mb-2">Password</label>
            <input
              type="password"
              id="user-password"
              name="user_password"
              className="block placeholder:text-gray-500 border border-gray-300 rounded-xl w-full py-4 px-2"
              placeholder="Enter your password"
            />
            <button
              className='bg-orange-primary text-white py-4 my-4 rounded-xl font-bold w-full cursor-pointer hover:bg-orange-secondary transition-colors duration-300'>
              Login
            </button>
          </form>
          <p className="text-center text-orange-primary">
            <a href="/reset-password">Forgot Password?</a>
          </p>
        </div>
        <p className="text-gray-600 text-center">
          Don't have an account? <a href="/register" className="text-orange-primary">Sign Up</a>
        </p>
      </div>
    </div>
  )
}

export default Login;