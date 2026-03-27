import { getTravelTypes } from "../data";

const TripCard = ({ trip, onClick }) => {

  const { name, description, pictures, price, categories } = trip;
  const thumbnail = pictures.length > 0 ? pictures[0] : '';

  return (
    <div className="flex shadow-md border border-gray-100 rounded-2xl p-3 gap-3 bg-white cursor-pointer" onClick={onClick}>
      <div className="shrink-0">
        <img
          src={thumbnail}
          className="h-24 w-24 object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <p className="font-semibold text-base">{name}</p>
        {description && <p className="text-xs text-gray-400 mt-0.5 line-clamp-2" dangerouslySetInnerHTML={{ __html: description }}></p>}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {categories.map(cat => {
            const category = getTravelTypes().find(type => type.id === cat);
            return <span key={cat} className="text-xs text-orange-primary px-2 py-0.5 rounded-full bg-orange-primary/20 capitalize">{category.type}</span>
          }
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-end shrink-0 mx-8">
        <p className="text-lg font-bold">${price.amount}</p>
      </div>
    </div>
  )
}

export default TripCard

