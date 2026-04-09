import { useState } from 'react';
import r1 from '../assets/images/results2.jpg'
import logo from '../assets/images/logowhite.svg'
import { Link, useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Register = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(result.user, { displayName: name });
      // Sync user to MongoDB
      const idToken = await result.user.getIdToken();
      await fetch('/api/auth/firebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      navigate('/');
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Email already in use');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/weak-password':
          setError('Password is too weak');
          break;
        default:
          setError('Registration failed. Please try again');
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
            {t('createAccount')}
          </h1>
          <form onSubmit={handleRegister} className="mt-4 lg:mt-8 max-w-xs mx-auto">
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <label htmlFor="user-name" className="block text-gray-600 text-sm my-2">{t('fullName')}</label>
            <input
              type="text"
              id="user-name"
              name="user_name"
              className="block placeholder:text-gray-500 border border-gray-300 rounded-xl w-full py-4 px-2"
              placeholder={t('enterFullName')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <label htmlFor="user-confirm-password" className="block text-gray-600 text-sm mt-4 mb-2">{t('confirmPassword')}</label>
            <input
              type="password"
              id="user-confirm-password"
              name="user_confirm_password"
              className="block placeholder:text-gray-500 border border-gray-300 rounded-xl w-full py-4 px-2"
              placeholder={t('confirmYourPassword')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className='bg-orange-primary text-white py-4 my-4 rounded-xl font-bold w-full cursor-pointer hover:bg-orange-secondary transition-colors duration-300 disabled:opacity-50'>
              {loading ? 'Creating account...' : t('register')}
            </button>
          </form>
        </div>
        <p className="text-gray-600 text-center">
          {t('alreadyHaveAccount')} <Link to="/login" className="text-orange-primary">{t('signIn')}</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;
