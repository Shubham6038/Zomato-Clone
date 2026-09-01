import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from './store';

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    if (!email || !password) return alert('Please enter both Email and Password!');
    if (isSignUp && !name) return alert('Please enter your full Name!');

    dispatch(login({ name: name || 'Zomato User', email }));
    navigate('/dashboard');
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
   
      backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1600')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
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
        <source 
          src="https://cdn.coverr.co/videos/coverr-preparing-a-delicious-pizza-5282/1080p.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for better text readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        zIndex: 1
      }}></div>

      {/* Content Area */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <h1 style={{ fontSize: '72px', fontWeight: '900', fontStyle: 'italic', color: 'white', margin: '0 0 10px 0' }}>zomato</h1>
        <p style={{ fontSize: '22px', color: 'white', marginBottom: '30px', textAlign: 'center' }}>Discover the best food & drinks in your city</p>

        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
          <h2 style={{ marginTop: 0, color: '#1c1c1c', marginBottom: '8px' }}>
            {isSignUp ? 'Create an Account' : 'Log in to Zomato'}
          </h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
            {isSignUp ? 'Sign up to start ordering your favorite food' : 'Log in with your credentials to access the dashboard'}
          </p>

          <form onSubmit={handleAuth}>
            {isSignUp && (
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '12px', boxSizing: 'border-box' }}
              />
            )}

            <input 
              type="email" 
              placeholder="Email Address or Phone" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '12px', boxSizing: 'border-box' }}
            />

            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px', boxSizing: 'border-box' }}
            />

            <button type="submit" style={{ width: '100%', backgroundColor: '#e23744', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              {isSignUp ? 'Sign Up ➔' : 'Log In ➔'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
            {isSignUp ? 'Already have an account? ' : "New to Zomato? "}
            <span onClick={() => setIsSignUp(!isSignUp)} style={{ color: '#e23744', fontWeight: 'bold', cursor: 'pointer' }}>
              {isSignUp ? 'Log In' : 'Create account'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}