const PLACEHOLDER = 'https://placehold.co/96x96?text=✈';

export const TripCard = (trip) => {
  const { destination, tags, price, image, summary } = trip;

  return (
    <div className="flex shadow-md border border-gray-100 rounded-2xl p-3 gap-3 bg-white">
      <div className="flex-shrink-0">
        <img
          src={image || PLACEHOLDER}
          alt={destination}
          className="h-24 w-24 object-cover rounded-xl"
          onError={e => { e.target.src = PLACEHOLDER }}
        />
      </div>
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <p className="font-semibold text-base truncate">{destination}</p>
        {summary && <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{summary}</p>}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {tags.map(tag => (
            <span key={tag} className="text-xs text-orange-primary px-2 py-0.5 rounded-full bg-orange-primary/20 capitalize">{tag}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-end flex-shrink-0">
        {price ? (
          <p className="text-lg font-bold">${price}</p>
        ) : (
          <p className="text-xs text-gray-400 font-medium">Price TBD</p>
        )}
      </div>
    </div>
  )
}
