import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCity, setSearchQuery, setActiveCategory, togglePureVeg, addToCart, initialRestaurants } from './store';

// Direct imports
import Navbar from './Navbar';
import Collections from './Collections';
import Localities from './Localities';
import AppDownload from './AppDownload';
import Footer from './Footer';
import ZomatoGold from './ZomatoGold';
import Chatbot from './Chatbot'; 

// Local video import karein ya public folder ka path dein
import burgerVideo from './0_Burger_Food_1280x720.mp4'; 

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items || []);
  const { city, searchQuery, activeCategory, pureVegOnly } = useSelector((state) => state.filters);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  const filteredRestaurants = initialRestaurants.filter((res) => {
    const matchesCity = res.location === city;
    const matchesCategory = res.category === activeCategory;
    const matchesVeg = pureVegOnly ? res.isVeg === true : true;
    const matchesSearch =
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.cuisine.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCity && matchesCategory && matchesVeg && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '30px' }}>
      
      {/* 🎬 HERO SECTION WITH BACKGROUND VIDEO */}
      <div style={{
        position: 'relative',
        height: '420px',
        color: 'white',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '15px 30px'
      }}>
        
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            zIndex: 0,
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover'
          }}
        >
          <source src={burgerVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay for better text visibility */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1
        }}></div>

        {/* Hero Content (Foreground) */}
        <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <Navbar />
        </div>

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <h1 style={{ fontSize: '72px', fontWeight: '900', fontStyle: 'italic', margin: '0 0 10px 0' }}>zomato</h1>
          <p style={{ fontSize: '26px', margin: '0 0 25px 0' }}>Discover the best food & drinks in {city}</p>

          <div style={{ display: 'flex', backgroundColor: 'white', padding: '8px 12px', borderRadius: '10px', width: '100%', maxWidth: '650px', gap: '10px', color: '#333', margin: '0 auto' }}>
            <select value={city} onChange={(e) => dispatch(setCity(e.target.value))} style={{ border: 'none', borderRight: '1px solid #ccc', paddingRight: '10px', fontWeight: 'bold', background: 'transparent', cursor: 'pointer' }}>
              <option value="Delhi NCR">📍 Delhi NCR</option>
              <option value="Mumbai">📍 Mumbai</option>
            </select>
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or a dish..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              style={{ width: '100%', border: 'none', outline: 'none', fontSize: '15px' }}
            />
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}></div>
      </div>

      {/* SECTION 1: COLLECTIONS */}
      <Collections city={city} />

      {/* SECTION 2: ZOMATO GOLD BANNER */}
      <ZomatoGold />

      {/* SECTION 3: CATEGORY & FILTERS */}
      <div style={{ backgroundColor: '#f8f8f8', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '15px 20px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', position: 'sticky', top: '0', zIndex: '100' }}>
        {[
          { id: 'delivery', label: '🛵 Delivery' },
          { id: 'dining', label: '🍽️ Dining Out' },
          { id: 'nightlife', label: '🍹 Nightlife' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => dispatch(setActiveCategory(cat.id))}
            style={{
              padding: '10px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px',
              backgroundColor: activeCategory === cat.id ? '#e23744' : 'white', color: activeCategory === cat.id ? 'white' : '#555',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}
          >
            {cat.label}
          </button>
        ))}

        <button
          onClick={() => dispatch(togglePureVeg())}
          style={{
            padding: '10px 20px', borderRadius: '20px', border: '1px solid #24963f', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px',
            backgroundColor: pureVegOnly ? '#24963f' : 'white', color: pureVegOnly ? 'white' : '#24963f'
          }}
        >
          {pureVegOnly ? '✓ Pure Veg Only' : '🌱 Pure Veg'}
        </button>
      </div>

      {/* SECTION 4: RESTAURANT CARDS */}
      <div style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px' }}>
        <h2 style={{ textTransform: 'capitalize', color: '#1c1c1c' }}>
          {activeCategory === 'delivery' ? '🛵 Delivery' : activeCategory === 'dining' ? '🍽️ Dining Out' : '🍹 Nightlife'} Restaurants in {city}
        </h2>

        {filteredRestaurants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '15px', border: '1px solid #eee' }}>
            <p style={{ color: '#777', fontSize: '16px' }}>No restaurants found matching your selected filters.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {filteredRestaurants.map((res) => (
              <div
                key={res.id}
                onClick={() => setSelectedRestaurant(res)}
                style={{ backgroundColor: 'white', borderRadius: '15px', padding: '12px', border: '1px solid #eee', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'transform 0.2s' }}
              >
                <div style={{ position: 'relative' }}>
                  <img src={res.image} alt={res.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px' }} />
                  {res.isVeg && (
                    <span style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#24963f', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>
                      PURE VEG
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#1c1c1c' }}>{res.name}</h3>
                  <span style={{ backgroundColor: '#24963f', color: 'white', padding: '2px 6px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold' }}>{res.rating}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '13px', marginTop: '6px' }}>
                  <span>{res.cuisine}</span>
                  <span>{res.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 5: LOCALITIES */}
      <Localities city={city} />

      {/* SECTION 6: APP DOWNLOAD BANNER */}
      <AppDownload />

      {/* SECTION 7: FOOTER */}
      <Footer />

      {/* MENU MODAL */}
      {selectedRestaurant && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '15px', width: '90%', maxWidth: '450px', padding: '20px', position: 'relative' }}>
            <button onClick={() => setSelectedRestaurant(null)} style={{ position: 'absolute', right: '15px', top: '15px', border: 'none', background: 'none', fontSize: '18px', cursor: 'pointer' }}>✖</button>
            <h3 style={{ margin: '0 0 5px 0' }}>{selectedRestaurant.name}</h3>
            <p style={{ color: '#666', fontSize: '13px', margin: '0 0 15px 0' }}>{selectedRestaurant.cuisine}</p>
            <hr />
            <h4 style={{ margin: '15px 0 10px 0' }}>Menu Items</h4>
            {selectedRestaurant.menu.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{item.isVeg ? '🟢' : '🔴'} {item.name}</p>
                  <p style={{ margin: '2px 0 0 0', color: '#555' }}>₹{item.price}</p>
                </div>
                <button
                  onClick={() => dispatch(addToCart(item))}
                  style={{ backgroundColor: '#e23744', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  + ADD
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FLOATING CART BAR */}
      {cartItems.length > 0 && (
        <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#e23744', color: 'white', width: '90%', maxWidth: '500px', padding: '12px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.3)', zIndex: 900 }}>
          <div>
            <p style={{ margin: 0, fontWeight: 'bold' }}>{cartItems.reduce((sum, item) => sum + item.qty, 0)} Items Added</p>
            <p style={{ margin: 0, fontSize: '14px' }}>Total: ₹{cartTotal}</p>
          </div>
          <button onClick={() => navigate('/cart')} style={{ backgroundColor: 'white', color: '#e23744', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Go to Cart ➔
          </button>
        </div>
      )}

      {/* 🤖 FLOATING CHATBOT WIDGET */}
      <Chatbot />

    </div>
  );
}