import React, { useState } from 'react';

export default function Collections({ city }) {
  const [activeModal, setActiveModal] = useState(null);

  const collectionsData = [
    {
      id: 1,
      title: 'Top Trending Spots',
      places: '28 Places',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400',
      description: 'The most popular and vibrant food hotspots trending in town this week.',
      topPick: 'The Pizza Express, Hauz Khas Social, Bastian'
    },
    {
      id: 2,
      title: 'Best Rooftop Places',
      places: '19 Places',
      image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=400',
      description: 'Dine under the stars with breathtaking city views and great cocktails.',
      topPick: 'Dome InterContinental, Aer Rooftop Bar, Lord of the Drinks'
    },
    {
      id: 3,
      title: 'Newly Opened Cafes',
      places: '12 Places',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400',
      description: 'Explore brand new artisanal cafes serving specialty brews and desserts.',
      topPick: 'Prithvi Cafe, Carnatic Cafe, Organic Lounge'
    },
    {
      id: 4,
      title: 'Authentic Pure Veg',
      places: '22 Places',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
      description: 'Traditional, 100% pure vegetarian dining with rich thalis and sweets.',
      topPick: 'Sattvik, Shree Thaker Bhojanalay, Swati Snacks'
    },
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      <h2 style={{ fontSize: '30px', margin: '0 0 5px 0', color: '#1c1c1c' }}>Collections</h2>
      <p style={{ color: '#666', margin: '0 0 20px 0', fontSize: '15px' }}>
        Explore curated lists of top restaurants, cafes, pubs, and bars in {city}, based on trends
      </p>

      {/* COLLECTION CARDS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {collectionsData.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setActiveModal(item)}
            style={{
              position: 'relative', 
              height: '280px', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              cursor: 'pointer',
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1)), url('${item.image}')`,
              backgroundSize: 'cover', 
              backgroundPosition: 'center', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'flex-end', 
              padding: '18px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
            }}
          >
            <span style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              backgroundColor: 'rgba(226, 55, 68, 0.9)',
              color: 'white',
              fontSize: '11px',
              fontWeight: 'bold',
              padding: '4px 10px',
              borderRadius: '12px'
            }}>
              Curated List
            </span>
            <p style={{ color: 'white', fontWeight: 'bold', margin: '0 0 4px 0', fontSize: '19px' }}>{item.title}</p>
            <p style={{ color: '#ffd700', margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{item.places} ➔</p>
          </div>
        ))}
      </div>

      {/* COLLECTION DETAILS MODAL */}
      {activeModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 2000,
          display: 'flex',
          justify: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            maxWidth: '500px',
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}>
            <img src={activeModal.image} alt={activeModal.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            
            <button 
              onClick={() => setActiveModal(null)} 
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              ✕
            </button>

            <div style={{ padding: '24px' }}>
              <span style={{ backgroundColor: '#fff0f1', color: '#e23744', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                Zomato Collections • {city}
              </span>
              <h3 style={{ margin: '10px 0 6px 0', fontSize: '24px', color: '#1c1c1c' }}>{activeModal.title}</h3>
              <p style={{ color: '#666', fontSize: '14px', margin: '0 0 15px 0', lineHeight: '1.5' }}>{activeModal.description}</p>
              
              <div style={{ backgroundColor: '#f9f9f9', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', borderLeft: '4px solid #e23744' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#888', fontWeight: 'bold' }}>TOP RECOMMENDED SPOTS:</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#1c1c1c', fontWeight: '500' }}>{activeModal.topPick}</p>
              </div>

              <button 
                onClick={() => {
                  setActiveModal(null);
                  window.scrollTo({ top: 800, behavior: 'smooth' });
                }} 
                style={{
                  width: '100%',
                  backgroundColor: '#e23744',
                  color: 'white',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(226, 55, 68, 0.3)'
                }}
              >
                Explore Restaurants Below ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}