import { useState } from 'react';
import r1 from '../assets/images/results3.jpg'
import logo from '../assets/images/logowhite.svg'
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ResetPassword = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('A password reset link has been sent to your email.');
      setEmail('');
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email address.');
          break;
        default:
          setError('Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-center font-bold text-xl lg:text-3xl underline decoration-orange-primary underline-offset-8">
            {t('resetPassword')}
          </h1>
          <p className='text-center mt-2 text-gray-400'>Enter your email to reset your password.</p>
          <form onSubmit={handleResetPassword} className="mt-4 lg:mt-8 max-w-xs mx-auto">
            {message && (
              <p className="text-green-600 text-sm mb-4 text-center bg-green-50 py-2 rounded-lg">{message}</p>
            )}
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center bg-red-50 py-2 rounded-lg">{error}</p>
            )}
            <label htmlFor="user-email" className="block text-gray-600 text-sm my-2">{t('email')}</label>
            <input
              type="email"
              id="user-email"
              name="user_email"
              className="block placeholder:text-gray-500 border border-gray-300 rounded-xl w-full py-4 px-2"
              placeholder={t('enterEmail')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className={`bg-orange-primary text-white py-4 my-4 rounded-xl font-bold w-full transition-colors duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-orange-secondary'
              }`}>
              {loading ? 'Sending...' : t('sendResetLink')}
            </button>
          </form>
          <p className="text-center text-orange-primary">
            <Link to="/login">{t('backToLogin')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;
