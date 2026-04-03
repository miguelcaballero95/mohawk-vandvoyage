import { FiX, FiCheck } from 'react-icons/fi';
import { getTravelTypes, getCities } from '../data';
import { useState, useEffect } from 'react';
import { useFilters } from '../stores/filters.store';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const FiltersSidebar = ({ isOpen, onClose }) => {
  const { 
    cities: storeCities, 
    travelTypes: storeTravelTypes, 
    minPrice: storeMinPrice, 
    maxPrice: storeMaxPrice,
    setCities,
    setTravelTypes,
    setMinPrice,
    setMaxPrice,
    clearFilters
  } = useFilters();

  const allTravelTypes = getTravelTypes();
  const allCities = getCities();

  const [localCities, setLocalCities] = useState(storeCities);
  const [localTravelTypes, setLocalTravelTypes] = useState(storeTravelTypes);
  const [localMinPrice, setLocalMinPrice] = useState(storeMinPrice || '');
  const [localMaxPrice, setLocalMaxPrice] = useState(storeMaxPrice || '');

  // Sync local state when sidebar opens
  useEffect(() => {
    if (isOpen) {
      setLocalCities(storeCities);
      setLocalTravelTypes(storeTravelTypes);
      setLocalMinPrice(storeMinPrice || '');
      setLocalMaxPrice(storeMaxPrice || '');
    }
  }, [isOpen, storeCities, storeTravelTypes, storeMinPrice, storeMaxPrice]);

  function handleCategoryChange(categoryId) {
    setLocalTravelTypes(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  }

  function handleApplyFilters() {
    // Update store
    setCities(localCities);
    setTravelTypes(localTravelTypes);
    setMinPrice(localMinPrice === '' ? null : localMinPrice);
    setMaxPrice(localMaxPrice === '' ? null : localMaxPrice);
    onClose();
  }

  function handleClearAll() {
    setLocalCities([]);
    setLocalTravelTypes([]);
    setLocalMinPrice('');
    setLocalMaxPrice('');
    clearFilters();
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full max-w-xs md:max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-blue-tertiary">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FiX size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Destinations */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Destinations</h3>
              <Autocomplete
                multiple
                options={allCities}
                getOptionLabel={(option) => option.label}
                value={allCities.filter(city => localCities.includes(city.id))}
                onChange={(event, newValue) => {
                  setLocalCities(newValue.map(city => city.id));
                }}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    placeholder="Search cities..." 
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                        },
                      },
                    }}
                  />
                )}
                sx={{
                  '& .MuiAutocomplete-tag': {
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    color: '#1e40af',
                    fontWeight: 600,
                    borderRadius: '8px',
                  }
                }}
              />
            </div>

            {/* Travel Style */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Travel Style</h3>
              <div className="grid grid-cols-1 gap-3">
                {allTravelTypes.map((type) => (
                  <label key={type.id} className="flex items-center group cursor-pointer">
                    <div className="relative flex items-center justify-center w-5 h-5 border-2 border-gray-300 rounded group-hover:border-blue-primary transition-colors">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        onChange={() => handleCategoryChange(type.id)} 
                        checked={localTravelTypes.includes(type.id)} 
                      />
                      <div className="absolute inset-0 bg-blue-primary scale-0 peer-checked:scale-100 transition-transform duration-200 rounded-[1px] flex items-center justify-center">
                        <FiCheck className="text-white text-xs" />
                      </div>
                    </div>
                    <span className="ml-3 text-neutral-charcoal font-medium group-hover:text-blue-primary transition-colors">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Min</label>
                    <div className="mt-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input 
                        type="number" 
                        placeholder="0" 
                        value={localMinPrice}
                        onChange={(e) => setLocalMinPrice(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-primary/20 focus:border-blue-primary transition-all" 
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Max</label>
                    <div className="mt-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input 
                        type="number" 
                        placeholder="5000" 
                        value={localMaxPrice}
                        onChange={(e) => setLocalMaxPrice(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-primary/20 focus:border-blue-primary transition-all" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="flex gap-4">
              <button
                onClick={handleClearAll}
                className="flex-1 px-4 py-3 border border-gray-200 text-neutral-charcoal font-bold rounded-xl hover:bg-gray-100 transition-colors">
                Clear All
              </button>
              <button
                onClick={handleApplyFilters}
                className="flex-2 px-4 py-3 bg-blue-primary text-white font-bold rounded-xl hover:bg-blue-secondary shadow-lg shadow-blue-primary/30 transition-all hover:-translate-y-0.5">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FiltersSidebar;
