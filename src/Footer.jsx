import React from 'react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#f8f8f8', borderTop: '1px solid #eee', padding: '40px 20px 20px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ margin: 0, color: '#000', fontStyle: 'italic', fontWeight: '900', fontSize: '36px' }}>zomato</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '30px', marginBottom: '30px' }}>
          <div>
            <h4 style={{ margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px' }}>ABOUT ZOMATO</h4>
            <p style={{ margin: '6px 0', color: '#666', fontSize: '13px' }}>Who We Are</p>
            <p style={{ margin: '6px 0', color: '#666', fontSize: '13px' }}>Blog</p>
            <p style={{ margin: '6px 0', color: '#666', fontSize: '13px' }}>Work With Us</p>
            <p style={{ margin: '6px 0', color: '#666', fontSize: '13px' }}>Investor Relations</p>
          </div>

          <div>
            <h4 style={{ margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px' }}>ZOMAVERSE</h4>
            <p style={{ margin: '6px 0', color: '#666', fontSize: '13px' }}>Zomato</p>
            <p style={{ margin: '6px 0', color: '#666', fontSize: '13px' }}>Blinkit</p>
            <p style={{ margin: '6px 0', color: '#666', fontSize: '13px' }}>Feeding India</p>
            <p style={{ margin: '6px 0', color: '#666', fontSize: '13px' }}>Hyperpure</p>
          </div>

          <div>
            <h4 style={{ margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px' }}>FOR RESTAURANTS</h4>
            <p style={{ margin: '6px 0', color: '#666', fontSize: '13px' }}>Partner With Us</p>
            <p style={{ margin: '6px 0', color: '#666', fontSize: '13px' }}>Apps For You</p>
          </div>

          <div>
            <h4 style={{ margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px' }}>LEARN MORE</h4>
            <p style={{ margin: '6px 0', color: '#666', fontSize: '13px' }}>Privacy</p>
            <p style={{ margin: '6px 0', color: '#666', fontSize: '13px' }}>Security</p>
            <p style={{ margin: '6px 0', color: '#666', fontSize: '13px' }}>Terms</p>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #ddd' }} />
        <p style={{ textAlign: 'center', color: '#888', fontSize: '13px', marginTop: '20px' }}>
          By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2026 © Zomato™ Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}