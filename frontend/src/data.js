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
    { id: 'toronto', city: "Toronto", lat: 43.70011, lon: -79.4163 },
    { id: 'hamilton', city: "Hamilton", lat: 43.25011, lon: -79.84963 },
    { id: 'new-york', city: "New York", lat: 40.71427, lon: -74.00597 },
    { id: 'chicago', city: "Chicago", lat: 41.85003, lon: -87.65005 },
    { id: 'montreal', city: "Montreal", lat: 45.50884, lon: -73.58781 },
    { id: 'vancouver', city: "Vancouver", lat: 49.24966, lon: -123.11934 },
  ];
}