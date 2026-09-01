import React, { useState } from 'react';
import { MapPin, Search, Star } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: "Order Online",
    desc: "Stay home and order to your doorstep",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    title: "Dining",
    desc: "View the city's favourite dining venues",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    title: "Nightlife and Clubs",
    desc: "Explore the city's top nightlife outlets",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400",
  },
];

const restaurants = [
  {
    id: 1,
    name: "The Pizza Express",
    cuisine: "Italian, Pizza, Fast Food",
    rating: 4.3,
    location: "Connaught Place, New Delhi",
    price: "₹600 for two",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Biryani Blues",
    cuisine: "Biryani, Hyderabadi, Mughlai",
    rating: 4.1,
    location: "Cyber Hub, Gurgaon",
    price: "₹500 for two",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Barbeque Nation",
    cuisine: "North Indian, BBQ, Kebab",
    rating: 4.5,
    location: "Indiranagar, Bengaluru",
    price: "₹1,200 for two",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    name: "Burger King",
    cuisine: "Burger, Fast Food, Beverages",
    rating: 4.2,
    location: "Sector 18, Noida",
    price: "₹350 for two",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400",
  },
];

export default function App() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');

  const filteredRestaurants = restaurants.filter((res) => {
    const matchesSearch =
      res.name.toLowerCase().includes(search.toLowerCase()) ||
      res.cuisine.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = res.location
      .toLowerCase()
      .includes(location.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8f8f8', minHeight: '100vh', margin: 0 }}>
      {/* HERO SECTION */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '420px',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <h1 style={{ fontSize: '60px', fontWeight: '900', fontStyle: 'italic', marginBottom: '10px' }}>
          zomato
        </h1>
        <p style={{ fontSize: '24px', marginBottom: '30px', textAlign: 'center' }}>
          Discover the best food & drinks in Delhi NCR
        </p>

        {/* SEARCH BOX */}
        <div style={{ display: 'flex', backgroundColor: 'white', padding: '10px', borderRadius: '10px', width: '100%', maxWidth: '700px', gap: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', color: '#333' }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '35%', borderRight: '1px solid #ddd', paddingRight: '10px' }}>
            <MapPin color="#e23744" size={20} style={{ marginRight: '8px', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Delhi NCR"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ border: 'none', outline: 'none', width: '100%' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', width: '65%' }}>
            <Search color="#888" size={20} style={{ marginRight: '8px', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or a dish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 'none', outline: 'none', width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {categories.map((cat) => (
          <div key={cat.id} style={{ backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <img src={cat.image} alt={cat.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '20px' }}>{cat.title}</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RESTAURANTS */}
      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px', paddingBottom: '40px' }}>
        <h2 style={{ fontSize: '28px', color: '#333', marginBottom: '20px' }}>Popular Restaurants near you</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {filteredRestaurants.map((res) => (
            <div key={res.id} style={{ backgroundColor: 'white', borderRadius: '15px', padding: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <img src={res.image} alt={res.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '18px' }}>{res.name}</h3>
                <span style={{ backgroundColor: '#24963f', color: 'white', padding: '3px 8px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold' }}>
                  {res.rating} ★
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '14px', marginTop: '5px' }}>
                <span>{res.cuisine}</span>
                <span>{res.price}</span>
              </div>
              <p style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>{res.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}