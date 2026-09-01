import React from 'react';

const ZomatoGold = () => {
  return (
    <section style={{
      position: 'relative',
      backgroundColor: '#0d0d0d',
      color: '#e5c158',
      padding: '70px 20px',
      textAlign: 'center',
      overflow: 'hidden',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      {/* Top Curved Border */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', lineHeight: 0, zIndex: 1 }}>
        <svg viewBox="0 0 1440 100" style={{ width: '100%', height: '50px', display: 'block' }} preserveAspectRatio="none">
          <path d="M0,100 C480,0 960,0 1440,100 L1440,0 L0,0 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* Decorative Gold Coins */}
      <div style={{ position: 'absolute', top: '35px', left: '4%', fontSize: '42px', zIndex: 2, userSelect: 'none' }}>
        🪙
      </div>
      <div style={{ position: 'absolute', top: '25px', right: '4%', fontSize: '65px', zIndex: 2, userSelect: 'none' }}>
        🪙
      </div>
      <div style={{ position: 'absolute', bottom: '45px', right: '22%', fontSize: '28px', zIndex: 2, userSelect: 'none' }}>
        🪙
      </div>

      {/* Main Content Area */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '750px', margin: '0 auto' }}>
        
        {/* Zomato Logo / Text */}
        <h3 style={{ fontSize: '32px', fontWeight: '900', color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>
          zomato
        </h3>

        {/* GOLD Title */}
        <h1 style={{
          fontSize: '70px',
          fontWeight: '900',
          margin: '-5px 0 10px 0',
          background: 'linear-gradient(180deg, #fce89e 0%, #c89a2a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '2px'
        }}>
          GOLD
        </h1>

        {/* Subtitle */}
        <p style={{ color: '#e5c158', fontSize: '18px', fontWeight: '500', lineHeight: '1.4', marginBottom: '25px' }}>
          India’s Top Savings<br />
          Program for Food Lovers
        </p>

        {/* Gold Benefits Header */}
        <div style={{ color: '#ffffff', fontSize: '15px', fontWeight: 'bold', letterSpacing: '3px', marginBottom: '30px' }}>
          <span style={{ color: '#e5c158', marginRight: '6px' }}>★</span>
          GOLD BENEFITS
          <span style={{ color: '#e5c158', marginLeft: '6px' }}>★</span>
        </div>

        {/* Benefits Grid */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          
          {/* Benefit 1 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            padding: '12px 24px',
            borderRadius: '50px',
            border: '1px solid rgba(229, 193, 88, 0.3)',
            textAlign: 'left'
          }}>
            <div style={{
              fontSize: '22px',
              backgroundColor: 'rgba(229, 193, 88, 0.15)',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              💳
            </div>
            <div>
              <h4 style={{ margin: 0, color: '#ffffff', fontSize: '15px', fontWeight: 'bold' }}>
                Free Delivery
              </h4>
              <p style={{ margin: '2px 0 0 0', color: '#aaaaaa', fontSize: '12px' }}>
                Above 249
              </p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            padding: '12px 24px',
            borderRadius: '50px',
            border: '1px solid rgba(229, 193, 88, 0.3)',
            textAlign: 'left'
          }}>
            <div style={{
              fontSize: '22px',
              backgroundColor: 'rgba(229, 193, 88, 0.15)',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              🛵
            </div>
            <div>
              <h4 style={{ margin: 0, color: '#ffffff', fontSize: '15px', fontWeight: 'bold' }}>
                Up to 30% extra off
              </h4>
              <p style={{ margin: '2px 0 0 0', color: '#aaaaaa', fontSize: '12px' }}>
                At 20,000+ partner restaurants
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Curved Border */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', lineHeight: 0, zIndex: 1 }}>
        <svg viewBox="0 0 1440 100" style={{ width: '100%', height: '50px', display: 'block' }} preserveAspectRatio="none">
          <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
};

export default ZomatoGold;