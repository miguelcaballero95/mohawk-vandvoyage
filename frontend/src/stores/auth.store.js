import { create } from 'zustand'
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'
import { auth } from '../config/firebase'

export const useAuth = create((set) => {
  // Listen to Firebase auth state and keep store in sync
  onAuthStateChanged(auth, (user) => {
    set({ user, loading: false })
  })

  return {
    user: null,
    loading: true,
    signOut: async () => {
      await firebaseSignOut(auth)
      set({ user: null })
    },
  }
})
