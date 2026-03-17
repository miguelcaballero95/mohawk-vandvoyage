import r1 from '../assets/images/results3.jpg'
import logo from '../assets/images/logowhite.svg'

const ResetPassword = () => {
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
      <div className="grow lg:w-1/2 flex flex-col justify-center gap-12 lg:gap-0">
        <div>
          <h1 className="text-center font-bold text-xl lg:text-3xl underline decoration-orange-primary underline-offset-8">Reset Password</h1>
          <p className='text-center mt-2 text-gray-400'>Enter your email to reset your password.</p>
          <form className="mt-4 lg:mt-8 max-w-xs mx-auto">
            <label htmlFor="user-email" className="block text-gray-600 text-sm my-2">Email</label>
            <input
              type="text"
              id="user-email"
              name="user_email"
              className="block placeholder:text-gray-500 border border-gray-300 rounded-xl w-full py-4 px-2"
              placeholder="Enter your email"
            />
            <button
              className='bg-orange-primary text-white py-4 my-4 rounded-xl font-bold w-full cursor-pointer hover:bg-orange-secondary transition-colors duration-300'>
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;