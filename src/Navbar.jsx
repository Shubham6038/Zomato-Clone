import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "./store";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // PlayStore / App Download QR Code URL
  const playstoreQrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://play.google.com/store/apps/details?id=com.application.zomato";

  return (
    <nav style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      
      {/* Brand & Get App QR Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ fontWeight: '800', fontSize: '26px', color: 'white', letterSpacing: '-0.5px' }}>ZOMATO</span>
        
        {/* PlayStore QR Code Box */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          padding: '4px 10px',
          borderRadius: '10px',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.25)'
        }}>
          <img 
            src={playstoreQrUrl} 
            alt="Get Zomato App QR" 
            style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '6px', 
              backgroundColor: 'white', 
              padding: '2px' 
            }} 
          />
          <div style={{ display: 'flex', flexDirection: 'column', color: 'white', fontSize: '11px', lineHeight: '1.2' }}>
            <span style={{ fontWeight: 'bold' }}>Get the App</span>
            <span style={{ opacity: 0.85 }}>Scan QR to Download</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', fontSize: '15px', alignItems: 'center' }}>
        <span style={{ color: 'white', cursor: 'pointer' }}>Investor Relations</span>
        <span style={{ color: 'white', cursor: 'pointer' }}>Add restaurant</span>
        
        {/* Profile Picture + Name Badge */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          backgroundColor: 'rgba(255, 255, 255, 0.2)', 
          padding: '4px 12px 4px 6px', 
          borderRadius: '25px', 
          color: 'white',
          backdropFilter: 'blur(5px)'
        }}>
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp4BwUTDpkdywC4AtDu9xSnci7ANVWr43JRFjpHH3nIg&s=10" 
            alt="Profile" 
            style={{ 
              width: '28px', 
              height: '28px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '1.5px solid white'
            }} 
          />
          <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
            {user?.name || 'Zomato User'}
          </span>
        </div>

        <button onClick={() => dispatch(logout())} style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid white', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer' }}>
          Log out
        </button>
      </div>
    </nav>
  );
}