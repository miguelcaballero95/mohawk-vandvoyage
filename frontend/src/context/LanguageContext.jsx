import { createContext, useContext, useState } from 'react';

// Supported languages
const LANGUAGES = ['en', 'es', 'fr'];

// All UI translations organized by language
const translations = {
  en: {
    // Nav
    explore: 'Explore',
    signIn: 'Sign In',
    signOut: 'Sign Out',

    // Home page
    findNextAdventure: 'Find Your Next',
    adventure: 'Adventure',
    whatLookingFor: 'What are you looking for?',
    where: 'Where?',
    anythingElse: 'Anything else?',
    anythingElsePlaceholder: 'Pet friendly, Hiking...',
    surpriseMe: 'Surprise Me!',

    // Login page
    welcomeBack: 'Welcome Back',
    email: 'Email',
    enterEmail: 'Enter your email',
    password: 'Password',
    enterPassword: 'Enter your password',
    login: 'Login',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    signUp: 'Sign Up',
    signInWithGoogle: 'Sign in with Google',
    orContinueWith: 'or continue with',

    // Results page
    discover: 'Discover',
    foundExperiences: 'Found {count} experiences for you.',
    filters: 'Filters',
    backToResults: 'Back to results',
    duration: 'Duration',
    price: 'Price',
    noActivities: 'No activities found matching your criteria.',
    clearAllFilters: 'Clear all filters',

    // Register page
    createAccount: 'Create Account',
    fullName: 'Full Name',
    enterFullName: 'Enter your full name',
    confirmPassword: 'Confirm Password',
    confirmYourPassword: 'Confirm your password',
    register: 'Register',
    alreadyHaveAccount: 'Already have an account?',

    // Reset password page
    resetPassword: 'Reset Password',
    sendResetLink: 'Send Reset Link',
    backToLogin: 'Back to Login',

    // Save experience / saved trips
    saveExperience: 'Save Experience',
    saved: 'Saved',
    savedTrips: 'Saved Trips',
    noSavedTrips: 'No saved trips yet.',
    exploreExperiences: 'Explore experiences',
    remove: 'Remove',
    maxSavedReached: 'Max 5 trips saved',

    // Filter sidebar
    travelStyle: 'Travel Style',
    priceRange: 'Price Range',
    min: 'Min',
    max: 'Max',
    clearAll: 'Clear All',
    applyFilters: 'Apply Filters',

    // Travel types
    'adventure-travel': 'Adventure Travel',
    'cultural-heritage-tourism': 'Cultural & Heritage Tourism',
    'eco-tourism': 'Eco-tourism',
    'all-inclusive': 'All-inclusive',
    'cruises': 'Cruises',
    'familty-vacations': 'Family Vacations',
    'luxury-travel': 'Luxury Travel',
    'solo-travel': 'Solo Travel',
    'wellness-travel': 'Wellness Travel',
  },

  es: {
    // Nav
    explore: 'Explorar',
    signIn: 'Iniciar Sesion',
    signOut: 'Cerrar Sesion',

    // Home page
    findNextAdventure: 'Encuentra Tu Proxima',
    adventure: 'Aventura',
    whatLookingFor: 'Que estas buscando?',
    where: 'Donde?',
    anythingElse: 'Algo mas?',
    anythingElsePlaceholder: 'Mascotas, Senderismo...',
    surpriseMe: 'Sorprendeme!',

    // Login page
    welcomeBack: 'Bienvenido de Nuevo',
    email: 'Correo Electronico',
    enterEmail: 'Ingresa tu correo',
    password: 'Contrasena',
    enterPassword: 'Ingresa tu contrasena',
    login: 'Iniciar Sesion',
    forgotPassword: 'Olvidaste tu contrasena?',
    noAccount: 'No tienes cuenta?',
    signUp: 'Registrate',
    signInWithGoogle: 'Iniciar sesion con Google',
    orContinueWith: 'o continua con',

    // Results page
    discover: 'Descubre',
    foundExperiences: '{count} experiencias encontradas para ti.',
    filters: 'Filtros',
    backToResults: 'Volver a resultados',
    duration: 'Duracion',
    price: 'Precio',
    noActivities: 'No se encontraron actividades con tus criterios.',
    clearAllFilters: 'Limpiar todos los filtros',

    // Register page
    createAccount: 'Crear Cuenta',
    fullName: 'Nombre Completo',
    enterFullName: 'Ingresa tu nombre completo',
    confirmPassword: 'Confirmar Contrasena',
    confirmYourPassword: 'Confirma tu contrasena',
    register: 'Registrarse',
    alreadyHaveAccount: 'Ya tienes cuenta?',

    // Reset password page
    resetPassword: 'Restablecer Contrasena',
    sendResetLink: 'Enviar Enlace',
    backToLogin: 'Volver al Inicio de Sesion',

    // Save experience / saved trips
    saveExperience: 'Guardar Experiencia',
    saved: 'Guardado',
    savedTrips: 'Viajes Guardados',
    noSavedTrips: 'Aun no tienes viajes guardados.',
    exploreExperiences: 'Explorar experiencias',
    remove: 'Eliminar',
    maxSavedReached: 'Maximo 5 viajes guardados',

    // Filter sidebar
    travelStyle: 'Estilo de Viaje',
    priceRange: 'Rango de Precios',
    min: 'Min',
    max: 'Max',
    clearAll: 'Limpiar Todo',
    applyFilters: 'Aplicar Filtros',

    // Travel types
    'adventure-travel': 'Viaje de Aventura',
    'cultural-heritage-tourism': 'Turismo Cultural y Patrimonial',
    'eco-tourism': 'Ecoturismo',
    'all-inclusive': 'Todo Incluido',
    'cruises': 'Cruceros',
    'familty-vacations': 'Vacaciones Familiares',
    'luxury-travel': 'Viaje de Lujo',
    'solo-travel': 'Viaje Solo',
    'wellness-travel': 'Viaje de Bienestar',
  },

  fr: {
    // Nav
    explore: 'Explorer',
    signIn: 'Se Connecter',
    signOut: 'Se Deconnecter',

    // Home page
    findNextAdventure: 'Trouvez Votre Prochaine',
    adventure: 'Aventure',
    whatLookingFor: 'Que recherchez-vous?',
    where: 'Ou?',
    anythingElse: 'Autre chose?',
    anythingElsePlaceholder: 'Animaux, Randonnee...',
    surpriseMe: 'Surprenez-moi!',

    // Login page
    welcomeBack: 'Bienvenue',
    email: 'Courriel',
    enterEmail: 'Entrez votre courriel',
    password: 'Mot de passe',
    enterPassword: 'Entrez votre mot de passe',
    login: 'Se Connecter',
    forgotPassword: 'Mot de passe oublie?',
    noAccount: "Vous n'avez pas de compte?",
    signUp: "S'inscrire",
    signInWithGoogle: 'Se connecter avec Google',
    orContinueWith: 'ou continuez avec',

    // Results page
    discover: 'Decouvrir',
    foundExperiences: '{count} experiences trouvees pour vous.',
    filters: 'Filtres',
    backToResults: 'Retour aux resultats',
    duration: 'Duree',
    price: 'Prix',
    noActivities: 'Aucune activite trouvee correspondant a vos criteres.',
    clearAllFilters: 'Effacer tous les filtres',

    // Register page
    createAccount: 'Creer un Compte',
    fullName: 'Nom Complet',
    enterFullName: 'Entrez votre nom complet',
    confirmPassword: 'Confirmer le Mot de Passe',
    confirmYourPassword: 'Confirmez votre mot de passe',
    register: "S'inscrire",
    alreadyHaveAccount: 'Vous avez deja un compte?',

    // Reset password page
    resetPassword: 'Reinitialiser le Mot de Passe',
    sendResetLink: 'Envoyer le Lien',
    backToLogin: 'Retour a la Connexion',

    // Save experience / saved trips
    saveExperience: 'Sauvegarder',
    saved: 'Sauvegarde',
    savedTrips: 'Voyages Sauvegardes',
    noSavedTrips: 'Aucun voyage sauvegarde.',
    exploreExperiences: 'Explorer les experiences',
    remove: 'Supprimer',
    maxSavedReached: 'Maximum 5 voyages sauvegardes',

    // Filter sidebar
    travelStyle: 'Style de Voyage',
    priceRange: 'Gamme de Prix',
    min: 'Min',
    max: 'Max',
    clearAll: 'Tout Effacer',
    applyFilters: 'Appliquer les Filtres',

    // Travel types
    'adventure-travel': "Voyage d'Aventure",
    'cultural-heritage-tourism': 'Tourisme Culturel et Patrimonial',
    'eco-tourism': 'Ecotourisme',
    'all-inclusive': 'Tout Compris',
    'cruises': 'Croisieres',
    'familty-vacations': 'Vacances en Famille',
    'luxury-travel': 'Voyage de Luxe',
    'solo-travel': 'Voyage Solo',
    'wellness-travel': 'Voyage Bien-etre',
  },
};

// Language display labels for the selector
const LANGUAGE_LABELS = { en: 'EN', es: 'ES', fr: 'FR' };

// Create the context
const LanguageContext = createContext();

// Provider component — wraps the app and provides language state + translation function
export const LanguageProvider = ({ children }) => {
  // Load saved language from localStorage, default to 'en'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('vandvoyage-lang') || 'en';
  });

  // Update language and persist to localStorage
  const changeLanguage = (lang) => {
    if (LANGUAGES.includes(lang)) {
      setLanguage(lang);
      localStorage.setItem('vandvoyage-lang', lang);
    }
  };

  // Translation function — looks up key in current language, falls back to English
  const t = (key, replacements = {}) => {
    let text = translations[language]?.[key] || translations.en[key] || key;
    // Replace placeholders like {count} with actual values
    Object.entries(replacements).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v);
    });
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, LANGUAGES, LANGUAGE_LABELS }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context in any component
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
