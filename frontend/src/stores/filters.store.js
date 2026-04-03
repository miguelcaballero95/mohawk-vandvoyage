import { create } from 'zustand'

export const useFilters = create((set) => ({
  cities: [],
  travelTypes: [],
  minPrice: null,
  maxPrice: null,
  toggleCities: (city) => set(state => {
    if (state.cities.includes(city)) {
      return { cities: state.cities.filter(id => id !== city) };
    }
    return { cities: [...state.cities, city] };
  }),
  toggleTravelTypes: (travelType) => set(state => {
    if (state.travelTypes.includes(travelType)) {
      return { travelTypes: state.travelTypes.filter(id => id !== travelType) };
    }
    return { travelTypes: [...state.travelTypes, travelType] };
  }),
  setCities: (cities) => set({ cities }),
  setTravelTypes: (travelTypes) => set({ travelTypes }),
  setMinPrice: (price) => set({ minPrice: price }),
  setMaxPrice: (price) => set({ maxPrice: price }),
  clearFilters: () => set({
    cities: [],
    travelTypes: [],
    minPrice: null,
    maxPrice: null,
  })
}));