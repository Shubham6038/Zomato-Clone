import React, { useState } from 'react';
import { initialRestaurants } from './store';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ city: '', foodType: '' });
  const [recommendations, setRecommendations] = useState([]);

  // Reset Quiz
  const handleReset = () => {
    setStep(1);
    setAnswers({ city: '', foodType: '' });
    setRecommendations([]);
  };

  // Select City
  const handleCitySelect = (city) => {
    setAnswers((prev) => ({ ...prev, city }));
    setStep(2);
  };

  // Select Food Preference (Veg / Non-Veg / Any)
  const handleFoodSelect = (foodType) => {
    const updated = { ...answers, foodType };
    setAnswers(updated);

    // Pure dataset par filtering (Category / Delivery bilkul ignore karke)
    const matches = initialRestaurants.filter((res) => {
      // 1. City Match
      const matchesCity = res.location.toLowerCase() === updated.city.toLowerCase();
      if (!matchesCity) return false;

      // 2. Veg vs Non-Veg Match
      if (updated.foodType === 'veg') {
        // Agar Veg chahiye toh veg wale dikhao
        return res.isVeg === true || res.name.toLowerCase().includes('veg') || res.cuisine.toLowerCase().includes('veg');
      } else if (updated.foodType === 'nonveg') {
        // Agar Non-Veg chahiye
        return res.isVeg === false;
      }

      // 'any' case me saare dikhao
      return true;
    });

    setRecommendations(matches);
    setStep(3);
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999, fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* 🔴 CHATBOT TOGGLE BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: '#e23744',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 22px',
            fontSize: '15px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(226, 55, 68, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '18px' }}>🤖</span> Food Assistant
        </button>
      )}

      {/* 💬 CHATBOX MODAL */}
      {isOpen && (
        <div style={{
          width: '350px',
          maxHeight: '520px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 12px 35px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          border: '1px solid #eee',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{ backgroundColor: '#e23744', color: 'white', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🤖</span>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px' }}>Foodie Assistant</h4>
                <p style={{ margin: 0, fontSize: '11px', opacity: 0.9 }}>AI Recommendations</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
          </div>

          {/* Body */}
          <div style={{ padding: '16px', overflowY: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* STEP 1: CITY QUESTION */}
            {step === 1 && (
              <div>
                <div style={{ backgroundColor: '#f5f5f5', padding: '10px 14px', borderRadius: '14px 14px 14px 0', fontSize: '14px', color: '#333', marginBottom: '12px' }}>
                  Hey! 👋 Aap konse city me restaurant dhund rahe ho?
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={() => handleCitySelect('Delhi NCR')} style={btnStyle}>📍 Delhi NCR</button>
                  <button onClick={() => handleCitySelect('Mumbai')} style={btnStyle}>📍 Mumbai</button>
                </div>
              </div>
            )}

            {/* STEP 2: VEG OR NON-VEG QUESTION */}
            {step === 2 && (
              <div>
                <div style={{ backgroundColor: '#f5f5f5', padding: '10px 14px', borderRadius: '14px 14px 14px 0', fontSize: '14px', color: '#333', marginBottom: '12px' }}>
                  Aapka food preference kya hai? 😋
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={() => handleFoodSelect('veg')} style={btnStyle}>🌱 Pure Veg</button>
                  <button onClick={() => handleFoodSelect('nonveg')} style={btnStyle}>🍗 Non-Veg</button>
                  <button onClick={() => handleFoodSelect('any')} style={btnStyle}>✨ Dono Chalega</button>
                </div>
              </div>
            )}

            {/* STEP 3: MULTIPLE RECOMMENDATIONS LIST */}
            {step === 3 && (
              <div>
                <div style={{ backgroundColor: '#f5f5f5', padding: '10px 14px', borderRadius: '14px 14px 14px 0', fontSize: '13px', color: '#333', marginBottom: '12px' }}>
                  🎉 Found <b style={{ color: '#e23744' }}>{recommendations.length} options</b> in {answers.city}:
                </div>

                {/* Scrollable List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' }}>
                  {recommendations.length === 0 ? (
                    <p style={{ fontSize: '13px', color: '#666', textAlign: 'center' }}>No restaurants found!</p>
                  ) : (
                    recommendations.map((res) => (
                      <div key={res.id} style={{ border: '1px solid #eee', borderRadius: '12px', padding: '10px', backgroundColor: '#fafafa', display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <img src={res.image} alt={res.name} style={{ width: '65px', height: '65px', objectFit: 'cover', borderRadius: '8px' }} />
                        <div style={{ flexGrow: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ margin: 0, fontSize: '13px', color: '#1c1c1c' }}>{res.name}</h4>
                            <span style={{ backgroundColor: '#24963f', color: 'white', padding: '1px 5px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>{res.rating}</span>
                          </div>
                          <p style={{ margin: '2px 0', fontSize: '11px', color: '#666' }}>{res.cuisine}</p>
                          <p style={{ margin: 0, fontSize: '11px', color: '#e23744', fontWeight: 'bold' }}>{res.price}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <button onClick={handleReset} style={{ ...btnStyle, width: '100%', marginTop: '12px', backgroundColor: '#e23744', color: 'white', border: 'none' }}>
                  🔄 Search Again
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

const btnStyle = {
  backgroundColor: '#fff0f1',
  color: '#e23744',
  border: '1px solid #fcdada',
  padding: '8px 14px',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: 'bold',
  cursor: 'pointer'
};