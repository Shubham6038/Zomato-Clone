import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, addToCart, removeFromCart, clearCart } from './store';

import AuthPage from './AuthPage';
import DashboardPage from './DashboardPage';
import Chatbot from './Chatbot';

// Protected Route Guard
function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

const ZOMATO_BG_IMAGE = "data:image/jpeg;base64,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";

// ==========================================
// 🛒 CART PAGE COMPONENT
// ==========================================
function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items || []);
  const user = useSelector((state) => state.auth.user);
  
  const itemTotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  const deliveryCharge = itemTotal > 0 && itemTotal < 249 ? 89 : 0;
  const platformFee = itemTotal > 0 ? 6 : 0;
  const grandTotal = itemTotal + deliveryCharge + platformFee;

  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(18, 18, 18, 0.85), rgba(18, 18, 18, 0.88)), url('${ZOMATO_BG_IMAGE}')`,
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', minHeight: '100vh', paddingBottom: '60px'
    }}>
      <header style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '15px 40px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 onClick={() => navigate('/dashboard')} style={{ margin: 0, color: '#e23744', fontStyle: 'italic', fontWeight: '900', cursor: 'pointer', fontSize: '32px' }}>zomato</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontWeight: '600', color: '#333', backgroundColor: '#f5f5f5', padding: '6px 14px', borderRadius: '20px' }}>👤 {user?.name}</span>
          <button onClick={() => navigate('/dashboard')} style={{ border: 'none', background: '#e23744', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: 'white' }}>← Back to Menu</button>
        </div>
      </header>

      <div style={{ maxWidth: '950px', margin: '30px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '28px', color: 'white', marginBottom: '20px', fontWeight: 'bold' }}>🛒 My Cart Summary</h2>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
            <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" alt="Empty Cart" style={{ width: '220px', marginBottom: '20px' }} />
            <h3 style={{ color: '#1c1c1c', margin: '0 0 10px 0', fontSize: '22px' }}>Your Cart is Empty</h3>
            <p style={{ color: '#666', marginBottom: '25px', fontSize: '15px' }}>Good food is always waiting for you. Go ahead and order some delicious meals!</p>
            <button onClick={() => navigate('/dashboard')} style={{ backgroundColor: '#e23744', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>Explore Restaurants</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '25px' }}>
            <div>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '20px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', marginBottom: '20px' }}>
                <h3 style={{ marginTop: 0, borderBottom: '2px solid #f0f0f0', paddingBottom: '12px', color: '#1c1c1c', fontSize: '18px' }}>Selected Dishes</h3>
                {cartItems.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #eee' }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 'bold', color: '#1c1c1c', fontSize: '16px' }}>{item.isVeg ? '🟢' : '🔴'} {item.name}</p>
                      <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '13px' }}>₹{item.price} per item</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e23744', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff0f1' }}>
                      <button onClick={() => dispatch(removeFromCart(item.id))} style={{ border: 'none', background: 'none', color: '#e23744', width: '32px', height: '32px', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px' }}>-</button>
                      <span style={{ padding: '0 10px', fontWeight: 'bold', color: '#e23744', fontSize: '15px' }}>{item.qty}</span>
                      <button onClick={() => dispatch(addToCart(item))} style={{ border: 'none', background: 'none', color: '#e23744', width: '32px', height: '32px', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px' }}>+</button>
                    </div>
                    <span style={{ fontWeight: 'bold', color: '#1c1c1c', width: '80px', textAlign: 'right', fontSize: '16px' }}>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              {itemTotal < 249 && (
                <div style={{ backgroundColor: '#fff8e1', border: '1px solid #ffe082', padding: '12px 18px', borderRadius: '14px', marginBottom: '20px', color: '#b78103', fontSize: '14px', fontWeight: 'bold' }}>
                  ⚡ Add items worth ₹{249 - itemTotal} more to get <b>FREE Delivery</b>! (Current Delivery Charge: ₹89)
                </div>
              )}

              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '20px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                <h3 style={{ marginTop: 0, color: '#1c1c1c', fontSize: '18px' }}>📍 Delivery Address</h3>
                <input type="text" placeholder="Flat / House No. / Building Name / Street" defaultValue="102, Connaught Place, Central Delhi, Delhi NCR" style={{ width: '100%', padding: '14px', border: '1px solid #ccc', borderRadius: '10px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '20px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', position: 'sticky', top: '90px' }}>
                <h3 style={{ marginTop: 0, color: '#1c1c1c', borderBottom: '2px solid #f0f0f0', paddingBottom: '12px', fontSize: '18px' }}>Bill Details</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '14px 0', color: '#444', fontSize: '15px' }}><span>Item Total</span><span>₹{itemTotal}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '14px 0', color: '#444', fontSize: '15px' }}>
                  <span>Delivery Charge</span>
                  {deliveryCharge === 0 ? <span style={{ color: '#24963f', fontWeight: 'bold' }}>FREE</span> : <span style={{ color: '#e23744', fontWeight: 'bold' }}>₹89</span>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '14px 0', color: '#444', fontSize: '15px' }}><span>Platform Fee</span><span>₹6</span></div>
                <hr style={{ border: 'none', borderTop: '2px dashed #ddd', margin: '15px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0 25px 0', color: '#1c1c1c', fontWeight: 'bold', fontSize: '20px' }}><span>To Pay</span><span style={{ color: '#e23744' }}>₹{grandTotal}</span></div>
                <button onClick={() => navigate('/payment')} style={{ width: '100%', backgroundColor: '#e23744', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '17px', fontWeight: 'bold', cursor: 'pointer' }}>Proceed to Payment ➔</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 💳 PAYMENT PAGE COMPONENT WITH MAP ROUTE
// ==========================================
function PaymentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items || []);
  
  const itemTotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  const deliveryCharge = itemTotal > 0 && itemTotal < 249 ? 89 : 0;
  const grandTotal = itemTotal + deliveryCharge + (itemTotal > 0 ? 6 : 0);

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [showQrModal, setShowQrModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const MY_UPI_ID = "9560749648@ptyes"; 

  // DYNAMIC QR URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=${MY_UPI_ID}%26pn=Zomato%26am=${grandTotal}%26cu=INR`;

  const handlePayClick = () => {
    if (paymentMethod === 'upi') {
      setShowQrModal(true);
    } else {
      confirmOrder();
    }
  };

  const confirmOrder = () => {
    setShowQrModal(false);
    setIsSuccess(true);
    dispatch(clearCart());
  };

  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(18, 18, 18, 0.85), rgba(18, 18, 18, 0.88)), url('${ZOMATO_BG_IMAGE}')`,
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', minHeight: '100vh', paddingBottom: '60px'
    }}>
      <header style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '15px 40px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 onClick={() => navigate('/dashboard')} style={{ margin: 0, color: '#e23744', fontStyle: 'italic', fontWeight: '900', cursor: 'pointer', fontSize: '32px' }}>zomato</h1>
        <span style={{ fontWeight: 'bold', color: '#24963f', backgroundColor: '#e8f5e9', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' }}>🔒 256-Bit Encrypted Payment</span>
      </header>

      <div style={{ maxWidth: '620px', margin: '40px auto', padding: '0 20px' }}>
        {isSuccess ? (
          <div style={{ textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '35px 25px', borderRadius: '24px', boxShadow: '0 15px 35px rgba(0,0,0,0.3)' }}>
            <div style={{ width: '75px', height: '75px', borderRadius: '50%', backgroundColor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto', fontSize: '40px' }}>🎉</div>
            <h2 style={{ color: '#24963f', fontSize: '26px', margin: '0 0 8px 0', fontWeight: '900' }}>Order Placed Successfully!</h2>
            <p style={{ color: '#555', fontSize: '15px', marginBottom: '20px' }}>Payment Received! Your delivery partner is on the way.</p>

            {/* 🗺️ GOOGLE MAP LIVE ROUTE */}
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid #e0e0e0', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <div style={{ backgroundColor: '#1c1c1c', color: 'white', padding: '10px 15px', textAlign: 'left', fontWeight: 'bold', fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🛵 Live Delivery Tracking</span>
                <span style={{ color: '#24963f', fontSize: '12px' }}>● Estimated Time: 25 Mins</span>
              </div>
              <iframe
                title="Delivery Location Map"
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?saddr=Connaught+Place+Delhi&daddr=Saket+Delhi&output=embed"
              ></iframe>
            </div>

            <button onClick={() => navigate('/dashboard')} style={{ backgroundColor: '#e23744', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>Back to Dashboard</button>
          </div>
        ) : (
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '35px', borderRadius: '24px', boxShadow: '0 15px 35px rgba(0,0,0,0.3)' }}>
            <button onClick={() => navigate('/cart')} style={{ border: 'none', background: '#f5f5f5', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#555', marginBottom: '20px' }}>← Back to Cart Summary</button>
            <h2 style={{ marginTop: 0, color: '#1c1c1c', fontSize: '24px', fontWeight: 'bold' }}>Choose Payment Option</h2>
            
            <div style={{ backgroundColor: '#fff0f1', border: '1px solid #fcdada', padding: '16px 20px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <span style={{ color: '#555', fontWeight: 'bold', fontSize: '15px' }}>Total Amount to Pay</span>
              <span style={{ color: '#e23744', fontSize: '24px', fontWeight: '900' }}>₹{grandTotal}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
              <label onClick={() => setPaymentMethod('upi')} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '18px', border: paymentMethod === 'upi' ? '2px solid #e23744' : '1px solid #e0e0e0', borderRadius: '14px', cursor: 'pointer', backgroundColor: paymentMethod === 'upi' ? '#fff8f8' : 'white' }}>
                <input type="radio" name="pay" value="upi" checked={paymentMethod === 'upi'} readOnly />
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#1c1c1c', fontSize: '16px' }}>📱 UPI / QR Code (GPay / PhonePe / Paytm)</p>
                  <p style={{ margin: '2px 0 0 0', color: '#666', fontSize: '13px' }}>Scan Dynamic QR Code for ₹{grandTotal}</p>
                </div>
              </label>

              <label onClick={() => setPaymentMethod('card')} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '18px', border: paymentMethod === 'card' ? '2px solid #e23744' : '1px solid #e0e0e0', borderRadius: '14px', cursor: 'pointer', backgroundColor: paymentMethod === 'card' ? '#fff8f8' : 'white' }}>
                <input type="radio" name="pay" value="card" checked={paymentMethod === 'card'} readOnly />
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#1c1c1c', fontSize: '16px' }}>💳 Credit / Debit / ATM Cards</p>
                  <p style={{ margin: '2px 0 0 0', color: '#666', fontSize: '13px' }}>Visa, MasterCard, RuPay supported</p>
                </div>
              </label>

              <label onClick={() => setPaymentMethod('cod')} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '18px', border: paymentMethod === 'cod' ? '2px solid #e23744' : '1px solid #e0e0e0', borderRadius: '14px', cursor: 'pointer', backgroundColor: paymentMethod === 'cod' ? '#fff8f8' : 'white' }}>
                <input type="radio" name="pay" value="cod" checked={paymentMethod === 'cod'} readOnly />
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#1c1c1c', fontSize: '16px' }}>💵 Cash on Delivery (COD)</p>
                  <p style={{ margin: '2px 0 0 0', color: '#666', fontSize: '13px' }}>Pay cash to delivery executive</p>
                </div>
              </label>
            </div>

            <button onClick={handlePayClick} style={{ width: '100%', backgroundColor: '#24963f', color: 'white', border: 'none', padding: '18px', borderRadius: '14px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
              {paymentMethod === 'upi' ? 'Scan & Pay with UPI ➔' : `Pay ₹${grandTotal} & Place Order`}
            </button>
          </div>
        )}
      </div>

      {/* 📱 DYNAMIC UPI QR MODAL */}
      {showQrModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', textAlign: 'center', maxWidth: '380px', width: '100%', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <button onClick={() => setShowQrModal(false)} style={{ position: 'absolute', right: '15px', top: '15px', border: 'none', background: '#f0f0f0', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>

            <h3 style={{ margin: '0 0 5px 0', fontSize: '20px', color: '#1c1c1c' }}>Scan QR to Pay ₹{grandTotal}</h3>
            <p style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#666' }}>UPI ID: <b>{MY_UPI_ID}</b></p>

            <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '16px', border: '2px dashed #e0e0e0', display: 'inline-block', marginBottom: '15px' }}>
              <img src={qrCodeUrl} alt="Dynamic UPI QR Code" style={{ width: '200px', height: '200px', display: 'block' }} />
            </div>

            <div style={{ backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '10px', marginBottom: '20px', color: '#24963f', fontWeight: 'bold', fontSize: '18px' }}>
              Total Amount: ₹{grandTotal}
            </div>

            <button onClick={confirmOrder} style={{ width: '100%', backgroundColor: '#24963f', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              I Have Paid ₹{grandTotal} ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// MAIN APP ROUTER
// ==========================================
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/payment" 
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
