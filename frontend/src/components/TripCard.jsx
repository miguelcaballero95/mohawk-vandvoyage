import { getTravelTypes } from "../data";
import { FiMapPin } from 'react-icons/fi';
<<<<<<< HEAD
import { useLanguage } from '../context/LanguageContext';

const TripCard = ({ trip, onClick }) => {
  const { t } = useLanguage();
=======

const TripCard = ({ trip, onClick }) => {

>>>>>>> master
  const { name, description, pictures, price, categories, city } = trip;
  const thumbnail = pictures.length > 0 ? pictures[0] : '';

  return (
    <div className="flex shadow-md border border-gray-100 rounded-2xl p-3 gap-3 bg-white cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <div className="shrink-0">
<<<<<<< HEAD
        <img src={thumbnail} className="h-24 w-24 object-cover rounded-xl" />
      </div>
      <div className="flex flex-col justify-center flex-1 min-w-0">
        {/* City name with pin icon */}
=======
        <img
          src={thumbnail}
          className="h-24 w-24 object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-col justify-center flex-1 min-w-0">
>>>>>>> master
        <div className="flex items-center gap-1 mb-0.5">
          <FiMapPin size={10} className="text-gray-400" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{city}</span>
        </div>
        <p className="font-semibold text-base leading-tight truncate">{name}</p>
        {description && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1" dangerouslySetInnerHTML={{ __html: description }}></p>}
        <div className="flex flex-wrap gap-1 mt-1.5">
<<<<<<< HEAD
          {/* Show max 2 categories with translated label, then a +N badge */}
          {categories.slice(0, 2).map(cat => {
            const category = getTravelTypes().find(type => type.id === cat);
            return (
              <span key={cat} className="text-[10px] font-bold text-orange-primary px-2 py-0.5 rounded-full bg-orange-primary/10 capitalize">
                {t(cat) !== cat ? t(cat) : category?.label || cat}
              </span>
            )
          })}
          {categories.length > 2 && (
            <span className="text-[10px] font-bold text-gray-400 px-2 py-0.5 rounded-full bg-gray-100">+{categories.length - 2}</span>
          )}
=======
          {categories.slice(0, 2).map(cat => {
            const category = getTravelTypes().find(type => type.id === cat);
            return <span key={cat} className="text-[10px] font-bold text-orange-primary px-2 py-0.5 rounded-full bg-orange-primary/10 capitalize">{category?.label || cat}</span>
          }
          )}
          {categories.length > 2 && <span className="text-[10px] font-bold text-gray-400 px-2 py-0.5 rounded-full bg-gray-100">+{categories.length - 2}</span>}
>>>>>>> master
        </div>
      </div>
      <div className="flex flex-col justify-center items-end shrink-0 ml-4 mr-2">
        <p className="text-lg font-black text-blue-tertiary">${Math.round(price.amount)}</p>
      </div>
    </div>
  )
}

export default TripCard
<<<<<<< HEAD
=======

>>>>>>> master
