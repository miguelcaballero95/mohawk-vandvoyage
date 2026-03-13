export const fetchTrips = async (tag = null) => {
  const url = tag ? `/api/destinations?tag=${tag}` : '/api/destinations';
  const res = await fetch(url);
  const data = await res.json();
  return data.map(d => ({
    id: d._id,
    destination: `${d.city}, ${d.country}`,
    tags: d.tags,
    price: d.indicative_price ?? null,
    image: d.image_url ?? null,
    summary: d.summary,
  }));
};

export const fetchTravelTypes = () => {
  return [
    'Adventure Travel',
    'Cultural & Heritage Tourism',
    'Eco-tourism',
    'All-inclusive',
    'Cruises',
    'Family Vacations',
    'Luxury Travel',
    'Solo Travel',
    'Wellness Travel'
  ]
}
