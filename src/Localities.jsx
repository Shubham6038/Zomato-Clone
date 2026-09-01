import React from 'react';

export default function Localities({ city }) {
  const localities = city === 'Delhi NCR' 
    ? ['Connaught Place', 'Sector 29, Gurgaon', 'Hauz Khas Village', 'Rajouri Garden', 'Saket', 'Cyber Hub', 'Indirapuram', 'Noida Sector 18']
    : ['Bandra West', 'Lower Parel', 'Juhu', 'Andheri West', 'Powai', 'Colaba', 'Marine Drive', 'Dadarm'];

  return (
    <div style={{ maxWidth: '1100px', margin: '50px auto', padding: '0 20px' }}>
      <h2 style={{ fontSize: '28px', color: '#1c1c1c', marginBottom: '25px' }}>
        Popular localities in and around <span style={{ fontWeight: 'bold' }}>{city}</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
        {localities.map((loc, idx) => (
          <div key={idx} style={{
            backgroundColor: 'white', border: '1px solid #e8e8e8', padding: '15px 20px', borderRadius: '12px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.03)', cursor: 'pointer'
          }}>
            <div>
              <p style={{ margin: 0, fontWeight: 'bold', color: '#1c1c1c', fontSize: '16px' }}>{loc}</p>
              <p style={{ margin: '4px 0 0 0', color: '#888', fontSize: '13px' }}>350+ places</p>
            </div>
            <span style={{ color: '#888' }}>❯</span>
          </div>
        ))}
      </div>
    </div>
  );
}