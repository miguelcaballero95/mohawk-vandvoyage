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

export const getActivitiesBy = (city, category) => {

  const all = getHardcodedActivities();
  const cityActivities = all[city];

  const response = cityActivities.filter(activity => {
    return activity.categories.includes(category)
  });

  return response;
}

export const getTravelTypes = () => {
  return [
    { id: 'adventure-travel', type: 'Adventure Travel' },
    { id: 'cultural-heritage-tourism', type: 'Cultural & Heritage Tourism' },
    { id: 'eco-tourism', type: 'Eco-tourism' },
    { id: 'all-inclusive', type: 'All-inclusive' },
    { id: 'cruises', type: 'Cruises' },
    { id: 'familty-vacations', type: 'Family Vacations' },
    { id: 'luxury-travel', type: 'Luxury Travel' },
    { id: 'solo-travel', type: 'Solo Travel' },
    { id: 'wellness-travel', type: 'Wellness Travel' }
  ]
}

export const getCities = () => {
  return [
    { id: 'toronto', city: "Toronto", lat: 43.70011, lon: -79.4163, image: 'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blta5abe00235919420/67ce9162ef4ce61b7bd21dd1/BCC-2024-EXPLORER-TORONTO-BEST_PLACES_TO_VISIT-HEADER-MOBILE.jpg' },
    { id: 'hamilton', city: "Hamilton", lat: 43.25011, lon: -79.84963, image: 'https://images.trvl-media.com/place/3963/ed145666-0e43-4ef8-b78b-934c465a6460.jpg' },
    { id: 'new-york', city: "New York", lat: 40.71427, lon: -74.00597, image: 'https://bunny-wp-pullzone-nfqzsydbnl.b-cdn.net/wp-content/uploads/2022/10/times-meydani.jpg' },
    { id: 'chicago', city: "Chicago", lat: 41.85003, lon: -87.65005, image: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f' },
    { id: 'montreal', city: "Montreal", lat: 45.50884, lon: -73.58781, image: 'https://www.samcon.ca/wp-content/uploads/2024/10/caption.jpg' },
    { id: 'vancouver', city: "Vancouver", lat: 49.24966, lon: -123.11934, image: 'https://canadianaffair.adidocdn.dev/uploads/2023/10/website-banner-vancouver--stanley-park---157504844.jpg' },
  ];
}