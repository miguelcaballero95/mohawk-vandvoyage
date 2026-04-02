import { FiX, FiCheck } from 'react-icons/fi';
import { getTravelTypes } from '../data';
import { useLanguage } from '../context/LanguageContext';

const FiltersSidebar = ({ isOpen, onClose, activeCategories, setActiveCategories }) => {
  const travelTypes = getTravelTypes();
  // Get translation function from language context
  const { t } = useLanguage();

  function handleCategoryChange(categoryId) {
    const newCategories = activeCategories.includes(categoryId) ? activeCategories.filter(id => id !== categoryId) : [...activeCategories, categoryId];
    setActiveCategories(newCategories);
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full max-w-xs md:max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-blue-tertiary">{t('filters')}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FiX size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">{t('travelStyle')}</h3>
              <div className="grid grid-cols-1 gap-3">
                {travelTypes.map((type) => (
                  <label key={type.id} className="flex items-center group cursor-pointer">
                    <div className="relative flex items-center justify-center w-5 h-5 border-2 border-gray-300 rounded group-hover:border-blue-primary transition-colors">
                      <input type="checkbox" className="sr-only peer" onChange={() => handleCategoryChange(type.id)} checked={activeCategories.includes(type.id)} />
                      <div className="absolute inset-0 bg-blue-primary scale-0 peer-checked:scale-100 transition-transform duration-200 rounded-[1px] flex items-center justify-center">
                        <FiCheck className="text-white text-xs" />
                      </div>
                    </div>
                    {/* Translate travel type labels using their id as translation key */}
                    <span className="ml-3 text-neutral-charcoal font-medium group-hover:text-blue-primary transition-colors">{t(type.id)}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">{t('priceRange')}</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">{t('min')}</label>
                    <div className="mt-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input type="number" placeholder="0" className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-primary/20 focus:border-blue-primary transition-all" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">{t('max')}</label>
                    <div className="mt-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input type="number" placeholder="5000" className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-primary/20 focus:border-blue-primary transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-200 text-neutral-charcoal font-bold rounded-xl hover:bg-gray-100 transition-colors">
                {t('clearAll')}
              </button>
              <button
                onClick={onClose}
                className="flex-2 px-4 py-3 bg-blue-primary text-white font-bold rounded-xl hover:bg-blue-secondary shadow-lg shadow-blue-primary/30 transition-all hover:-translate-y-0.5">
                {t('applyFilters')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FiltersSidebar;
