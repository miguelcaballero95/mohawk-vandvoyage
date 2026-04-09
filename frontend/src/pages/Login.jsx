import { useState } from 'react';
import r1 from '../assets/images/results1.jpg'
import logo from '../assets/images/logowhite.svg'
import { Link, useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { auth, googleProvider } from '../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { apiUrl } from '../config/api';

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  // Handle Google sign-in using Firebase popup
  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      // Firebase auth succeeded — user is logged in regardless of backend sync
      const idToken = await result.user.getIdToken();
      // Try to sync user to MongoDB (best-effort — don't block on failure)
      try {
        await fetch(apiUrl('/api/auth/firebase'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });
      } catch {
        // Backend unavailable — user is still authenticated via Firebase
      }
      window.location.href = '/';
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError(err.message);
    }
  };

  return (
    <div className="grow px-4 lg:px-0 py-2 lg:py-0 flex flex-col lg:flex-row">
      {/* Left side — decorative panel with logo (hidden on mobile) */}
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

      {/* Right side — login form */}
      <div className="grow lg:w-1/2 flex flex-col justify-center gap-12 lg:gap-8">
        <div>
          <h1 className="text-center font-bold text-xl lg:text-3xl underline decoration-orange-primary underline-offset-8">
            {t('welcomeBack')}
          </h1>

          {/* Show error message if sign-in fails */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-4 max-w-xs mx-auto">{error}</p>
          )}

          {/* Email/password form */}
          <form onSubmit={handleLogin} className="mt-4 lg:mt-8 max-w-xs mx-auto">
            <label htmlFor="user-email" className="block text-gray-600 text-sm mb-2">{t('email')}</label>
            <input
              type="email"
              id="user-email"
              name="user_email"
              className="block placeholder:text-gray-500 border border-gray-300 rounded-xl w-full py-4 px-2"
              placeholder={t('enterEmail')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="user-password" className="block text-gray-600 text-sm mt-4 mb-2">{t('password')}</label>
            <input
              type="password"
              id="user-password"
              name="user_password"
              className="block placeholder:text-gray-500 border border-gray-300 rounded-xl w-full py-4 px-2"
              placeholder={t('enterPassword')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className='bg-orange-primary text-white py-4 my-4 rounded-xl font-bold w-full cursor-pointer hover:bg-orange-secondary transition-colors duration-300'>
              {t('login')}
            </button>
          </form>

          {/* Divider between email login and Google sign-in */}
          <div className="flex items-center gap-4 max-w-xs mx-auto my-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-400 text-sm">{t('orContinueWith')}</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google sign-in button */}
          <div className="max-w-xs mx-auto mt-4">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex items-center justify-center gap-3 w-full py-4 border border-gray-300 rounded-xl font-bold cursor-pointer hover:bg-gray-50 transition-colors duration-300"
            >
              {/* Google "G" icon */}
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              {t('signInWithGoogle')}
            </button>
          </div>

          <p className="text-center text-orange-primary mt-4">
            <Link to="/reset-password">{t('forgotPassword')}</Link>
          </p>
        </div>
        <p className="text-gray-600 text-center">
          {t('noAccount')} <Link to="/register" className="text-orange-primary">{t('signUp')}</Link>
        </p>
      </div>
    </div>
  )
}

export default Login;
