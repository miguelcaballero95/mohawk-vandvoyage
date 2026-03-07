export const TripCard = (trip) => {
  const { destination, tags, price, image } = trip;

  return (
    <div className="flex shadow-xl border border-gray-200/50 rounded-xl p-2">
      <div className="w-2/6">
        <img src={image} alt={destination} className="h-24 w-24 object-cover rounded-lg" />
      </div>
      <div className="w-3/6 flex flex-col justify-center">
        <p className="font-semibold">{destination}</p>
        <div className="text-sm py-1">
          {tags.map(tag => <span className="text-orange-primary px-2 rounded-full bg-orange-primary/30">{tag}</span>)}
        </div>
      </div>
      <div className="w-1/6 flex flex-col justify-center">
        <p className="text-lg font-semibold">${price}</p>
      </div>
    </div>
  )
}
