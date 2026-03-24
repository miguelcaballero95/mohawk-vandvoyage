// Template data for testing purposes
import r1 from './assets/images/results1.jpg'
import r2 from './assets/images/results2.jpg'
import r3 from './assets/images/results3.jpg'

export const fetchTrips = () => {
  return [
    {
      id: 1,
      destination: 'Barcelona',
      tags: ['Eco-tourism'],
      price: 500,
      image: r1
    },
    {
      id: 2,
      destination: 'Lisbon',
      tags: ['Adventure'],
      price: 300,
      image: r2
    },
    {
      id: 3,
      destination: 'Cancun',
      tags: ['All-inclusive'],
      price: 630,
      image: r3
    }
  ]
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
    { id: 'toronto', city: "Toronto", lat: 12, lon: 12 },
    { id: 'hamilton', city: "Hamilton", lat: 12, lon: 12 },
    { id: 'new-york', city: "New York", lat: 12, lon: 12 },
    { id: 'chicago', city: "Chicago", lat: 12, lon: 12 },
    { id: 'montreal', city: "Montreal", lat: 12, lon: 12 },
    { id: 'vancouver', city: "Vancouver", lat: 12, lon: 12 },
  ];
}