import axios from 'axios';
import getHardcodedActivities from './storage/activities';

export const getTrips = async (origin) => {
  const city = getCities().filter(city => {
    return city.id === origin;
  })[0];

  const { data } = await axios.get(`/.netlify/functions/getActivities`, {
    params: {
      lat: city.lat,
      lon: city.lon
    }
  });

  return data;
}

export const getActivitiesBy = (cities, travelTypes, minPrice, maxPrice) => {

  const activities = getHardcodedActivities();

  const response = activities.filter(activity => {
    const isInCity = cities.length === 0 || (cities.length > 0 && cities.includes(activity.cityCode));
    const hasTravelType = travelTypes.length === 0 || (travelTypes.length > 0 && travelTypes.some(type => activity.categories.includes(type)));
    
    const price = parseFloat(activity.price.amount);
    const matchesMinPrice = minPrice === null || minPrice === '' || price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === null || maxPrice === '' || price <= parseFloat(maxPrice);

    return isInCity && hasTravelType && matchesMinPrice && matchesMaxPrice;
  });

  return response;
}

export const getTravelTypes = () => {
  return [
    { id: 'adventure-travel', label: 'Adventure Travel', image: 'https://www.highriskvoyager.com/media/falcq2si/istock-1369171053.jpg?rxy=0.54739079450696249,0.54766002331649366&width=1500&height=700&v=1dbc5abc5172730' },
    { id: 'all-inclusive', label: 'All-inclusive', image: 'https://www.cvent.com/sites/default/files/image/2024-10/Hyatt-Regency-Grand-Reserve.jpg' },
    { id: 'cruises', label: 'Cruises', image: 'https://www.travelweek.ca/wp-content/uploads/2021/06/unnamed-1-1-830x526.jpg' },
    { id: 'cultural-heritage-tourism', label: 'Cultural & Heritage Tourism', image: 'https://whc.unesco.org/uploads/thumbs/event_1567-890-520-20201209181715.jpg' },
    { id: 'eco-tourism', label: 'Eco-tourism', image: 'https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/sp4v1vth556uvc9vppmj?_a=BACAGSGT' },
    { id: 'familty-vacations', label: 'Family Vacations', image: 'https://voyeglobal.com/wp-content/uploads/2025/05/family-vacation.jpg' },
    { id: 'luxury-travel', label: 'Luxury Travel', image: 'https://www.researchdive.com/blogImages/nbJxjr77ng.jpeg' },
    { id: 'solo-travel', label: 'Solo Travel', image: 'https://www.cohosts.ca/wp-content/uploads/2021/02/solo-traveller-woman.jpg' },
    { id: 'wellness-travel', label: 'Wellness Travel', image: 'https://media.gadventures.com/media-server/dynamic/admin/content_pages/wellnessmeta.jpg' }
  ]
}

export const getCities = () => {
  return [
    { id: 'toronto', label: "Toronto", lat: 43.70011, lon: -79.4163, image: 'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blta5abe00235919420/67ce9162ef4ce61b7bd21dd1/BCC-2024-EXPLORER-TORONTO-BEST_PLACES_TO_VISIT-HEADER-MOBILE.jpg' },
    { id: 'hamilton', label: "Hamilton", lat: 43.25011, lon: -79.84963, image: 'https://images.trvl-media.com/place/3963/ed145666-0e43-4ef8-b78b-934c465a6460.jpg' },
    { id: 'new-york', label: "New York", lat: 40.71427, lon: -74.00597, image: 'https://bunny-wp-pullzone-nfqzsydbnl.b-cdn.net/wp-content/uploads/2022/10/times-meydani.jpg' },
    { id: 'chicago', label: "Chicago", lat: 41.85003, lon: -87.65005, image: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f' },
    { id: 'montreal', label: "Montreal", lat: 45.50884, lon: -73.58781, image: 'https://www.samcon.ca/wp-content/uploads/2024/10/caption.jpg' },
    { id: 'vancouver', label: "Vancouver", lat: 49.24966, lon: -123.11934, image: 'https://canadianaffair.adidocdn.dev/uploads/2023/10/website-banner-vancouver--stanley-park---157504844.jpg' },
  ];
}