import React, { useState } from 'react';

export default function AppDownload() {
  const [contact, setContact] = useState('');

  return (
    <div style={{ backgroundColor: '#fffbfb', borderTop: '1px solid #f8e8e8', borderBottom: '1px solid #f8e8e8', padding: '50px 20px', marginTop: '60px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>
        <img src="https://b.zmtcdn.com/data/o2_assets/f773629053b24263e69f82f25f73b28f1679295536.png" alt="App Mobile" style={{ width: '220px' }} />
        
        <div style={{ maxWidth: '450px' }}>
          <h2 style={{ fontSize: '32px', margin: '0 0 10px 0', color: '#1c1c1c' }}>Get the Zomato app</h2>
          <p style={{ color: '#666', fontSize: '15px', marginBottom: '20px' }}>
            We will send you a link, open it on your phone to download the app
          </p>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input 
              type="text" 
              placeholder="Email or Phone Number" 
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              style={{ flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '8px', outline: 'none' }} 
            />
            <button onClick={() => alert('App Link sent to ' + contact)} style={{ backgroundColor: '#e23744', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Share App Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}