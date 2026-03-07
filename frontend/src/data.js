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