import { configureStore, createSlice } from '@reduxjs/toolkit';

// 1. Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false, user: null },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

// 2. Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        if (existing.qty === 1) {
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          existing.qty -= 1;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// 3. Filter Slice
const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    city: 'Delhi NCR',
    searchQuery: '',
    activeCategory: 'delivery',
    pureVegOnly: false,
  },
  reducers: {
    setCity: (state, action) => { state.city = action.payload; },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
    setActiveCategory: (state, action) => { state.activeCategory = action.payload; },
    togglePureVeg: (state) => { state.pureVegOnly = !state.pureVegOnly; },
  },
});

export const { login, logout } = authSlice.actions;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const { setCity, setSearchQuery, setActiveCategory, togglePureVeg } = filterSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    filters: filterSlice.reducer,
  },
});

// =========================================================
// HUGE RESTAURANT DATASET (8+ PER CITY AND CATEGORY)
// =========================================================
export const initialRestaurants = [
  // -------------------------------------------------------
  // 📍 DELHI NCR - DELIVERY (8 RESTAURANTS)
  // -------------------------------------------------------
  { 
    id: 101, name: "The Pizza Express", cuisine: "Italian, Pizza", rating: "4.3 ★", location: "Delhi NCR", price: "₹600 for two", category: "delivery", isVeg: false,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 1, name: "Margherita Pizza", price: 299, isVeg: true }, { id: 2, name: "Pepperoni Pizza", price: 449, isVeg: false }, { id: 3, name: "Garlic Bread", price: 149, isVeg: true }, { id: 4, name: "Farmhouse Pizza", price: 399, isVeg: true }]
  },
  { 
    id: 102, name: "Haldiram's Pure Veg", cuisine: "North Indian, Sweets", rating: "4.5 ★", location: "Delhi NCR", price: "₹400 for two", category: "delivery", isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 5, name: "Chole Bhature", price: 180, isVeg: true }, { id: 6, name: "Raj Kachori", price: 140, isVeg: true }, { id: 7, name: "Pav Bhaji", price: 160, isVeg: true }, { id: 8, name: "Rasgulla (2 pcs)", price: 80, isVeg: true }]
  },
  { 
    id: 103, name: "Biryani Blues", cuisine: "Biryani, Hyderabadi", rating: "4.2 ★", location: "Delhi NCR", price: "₹550 for two", category: "delivery", isVeg: false,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 9, name: "Chicken Biryani", price: 349, isVeg: false }, { id: 10, name: "Paneer Biryani", price: 299, isVeg: true }, { id: 11, name: "Galouti Kebab", price: 399, isVeg: false }, { id: 12, name: "Mirchi Ka Salan", price: 99, isVeg: true }]
  },
  { 
    id: 104, name: "Bikanervala Pure Veg", cuisine: "Street Food, Mithai", rating: "4.4 ★", location: "Delhi NCR", price: "₹450 for two", category: "delivery", isVeg: true,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 13, name: "Masala Dosa", price: 190, isVeg: true }, { id: 14, name: "Veg Thali", price: 280, isVeg: true }, { id: 15, name: "Kachori Sabzi", price: 90, isVeg: true }, { id: 16, name: "Gulab Jamun", price: 70, isVeg: true }]
  },
  { 
    id: 105, name: "Behrouz Biryani", cuisine: "Royal Biryani, Mughlai", rating: "4.6 ★", location: "Delhi NCR", price: "₹700 for two", category: "delivery", isVeg: false,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 17, name: "Dum Gosht Biryani", price: 480, isVeg: false }, { id: 18, name: "Subz-E-Biryani", price: 340, isVeg: true }, { id: 19, name: "Chicken Tikka", price: 380, isVeg: false }, { id: 20, name: "Phirani Dessert", price: 120, isVeg: true }]
  },
  { 
    id: 106, name: "Sagar Ratna Pure Veg", cuisine: "South Indian, Pure Veg", rating: "4.5 ★", location: "Delhi NCR", price: "₹500 for two", category: "delivery", isVeg: true,
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 21, name: "Rava Onion Dosa", price: 210, isVeg: true }, { id: 22, name: "Idli Vada Combo", price: 150, isVeg: true }, { id: 23, name: "Filter Coffee", price: 80, isVeg: true }, { id: 24, name: "Lemon Rice", price: 180, isVeg: true }]
  },
  { 
    id: 107, name: "KFC Fast Food", cuisine: "Burger, Fried Chicken", rating: "4.1 ★", location: "Delhi NCR", price: "₹450 for two", category: "delivery", isVeg: false,
    image: "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 25, name: "Zinger Burger", price: 190, isVeg: false }, { id: 26, name: "Veg Crispy Burger", price: 140, isVeg: true }, { id: 27, name: "Chicken Bucket", price: 590, isVeg: false }, { id: 28, name: "Fries & Dip", price: 110, isVeg: true }]
  },
  { 
    id: 108, name: "Nirula's Pure Veg Ice Creams", cuisine: "Desserts, Fast Food", rating: "4.3 ★", location: "Delhi NCR", price: "₹350 for two", category: "delivery", isVeg: true,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 29, name: "Hot Chocolate Fudge", price: 240, isVeg: true }, { id: 30, name: "Maharaja Burger (Veg)", price: 180, isVeg: true }, { id: 31, name: "Vanilla Scoop", price: 90, isVeg: true }, { id: 32, name: "Pineapple Sundae", price: 210, isVeg: true }]
  },

  // -------------------------------------------------------
  // 📍 DELHI NCR - DINING OUT (8 RESTAURANTS)
  // -------------------------------------------------------
  { 
    id: 109, name: "Barbeque Nation", cuisine: "BBQ, Buffet, Kebabs", rating: "4.6 ★", location: "Delhi NCR", price: "₹1,200 for two", category: "dining", isVeg: false,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 33, name: "Non-Veg BBQ Buffet", price: 899, isVeg: false }, { id: 34, name: "Veg BBQ Buffet", price: 749, isVeg: true }, { id: 35, name: "Crispy Corn", price: 220, isVeg: true }, { id: 36, name: "Cajun Potato", price: 240, isVeg: true }]
  },
  { 
    id: 110, name: "Sattvik Pure Veg", cuisine: "Pure Veg, Shahi North Indian", rating: "4.5 ★", location: "Delhi NCR", price: "₹950 for two", category: "dining", isVeg: true,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 37, name: "Royal Sattvik Thali", price: 450, isVeg: true }, { id: 38, name: "Paneer Butter Masala", price: 340, isVeg: true }, { id: 39, name: "Dal Makhani", price: 290, isVeg: true }, { id: 40, name: "Garlic Naan", price: 90, isVeg: true }]
  },
  { 
    id: 111, name: "Carnatic Cafe Pure Veg", cuisine: "South Indian, Authentic", rating: "4.7 ★", location: "Delhi NCR", price: "₹500 for two", category: "dining", isVeg: true,
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 41, name: "Mallenadu Dosa", price: 220, isVeg: true }, { id: 42, name: "Rava Idli Sambar", price: 140, isVeg: true }, { id: 43, name: "Filter Coffee", price: 80, isVeg: true }, { id: 44, name: "Onion Uttapam", price: 180, isVeg: true }]
  },
  { 
    id: 112, name: "Govinda's ISKCON Pure Veg", cuisine: "Sattvic, Thali", rating: "4.6 ★", location: "Delhi NCR", price: "₹600 for two", category: "dining", isVeg: true,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 45, name: "Special ISKCON Thali", price: 320, isVeg: true }, { id: 46, name: "Cheese Butter Masala", price: 280, isVeg: true }, { id: 47, name: "Kheer Prasadam", price: 100, isVeg: true }, { id: 48, name: "Veg Kofta", price: 260, isVeg: true }]
  },
  { 
    id: 113, name: "Punjab Grill", cuisine: "North Indian, Mughlai", rating: "4.7 ★", location: "Delhi NCR", price: "₹1,800 for two", category: "dining", isVeg: false,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 49, name: "Butter Chicken", price: 540, isVeg: false }, { id: 50, name: "Dal Punjab Grill", price: 380, isVeg: true }, { id: 51, name: "Amritsari Kulcha", price: 160, isVeg: true }, { id: 52, name: "Tandoori Chicken", price: 490, isVeg: false }]
  },
  { 
    id: 114, name: "Rajdhani Thali Pure Veg", cuisine: "Rajasthani, Gujarati Thali", rating: "4.4 ★", location: "Delhi NCR", price: "₹900 for two", category: "dining", isVeg: true,
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 53, name: "Unlimited Royal Thali", price: 550, isVeg: true }, { id: 54, name: "Dal Baati Churma", price: 280, isVeg: true }, { id: 55, name: "Dhokla Platter", price: 160, isVeg: true }, { id: 56, name: "Mango Shrikhand", price: 120, isVeg: true }]
  },
  { 
    id: 115, name: "Mainland China", cuisine: "Chinese, Asian", rating: "4.5 ★", location: "Delhi NCR", price: "₹1,500 for two", category: "dining", isVeg: false,
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 57, name: "Dimsum Basket", price: 380, isVeg: false }, { id: 58, name: "Hakha Noodles", price: 290, isVeg: true }, { id: 59, name: "Manchurian Gravy", price: 320, isVeg: true }, { id: 60, name: "Kung Pao Chicken", price: 440, isVeg: false }]
  },
  { 
    id: 116, name: "Saravana Bhavan Pure Veg", cuisine: "South Indian, Pure Veg", rating: "4.6 ★", location: "Delhi NCR", price: "₹500 for two", category: "dining", isVeg: true,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 61, name: "Special Ghee Roast Dosa", price: 230, isVeg: true }, { id: 62, name: "Mini Tiffin Combo", price: 260, isVeg: true }, { id: 63, name: "Sambar Vada", price: 120, isVeg: true }, { id: 64, name: "Payasam Dessert", price: 90, isVeg: true }]
  },

  // -------------------------------------------------------
  // 📍 DELHI NCR - NIGHTLIFE (8 RESTAURANTS)
  // -------------------------------------------------------
  { 
    id: 117, name: "Hauz Khas Social", cuisine: "Continental, Drinks", rating: "4.7 ★", location: "Delhi NCR", price: "₹1,600 for two", category: "nightlife", isVeg: false,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 65, name: "Loaded Nachos", price: 320, isVeg: true }, { id: 66, name: "Chicken Wings", price: 380, isVeg: false }, { id: 67, name: "LIIT Pitcher", price: 999, isVeg: true }, { id: 68, name: "White Sauce Pasta", price: 360, isVeg: true }]
  },
  { 
    id: 118, name: "The Green Lounge (Veg Pub)", cuisine: "Veg Drinks, Snacks", rating: "4.3 ★", location: "Delhi NCR", price: "₹1,100 for two", category: "nightlife", isVeg: true,
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 69, name: "Jalapeno Poppers", price: 280, isVeg: true }, { id: 70, name: "Virgin Mojito", price: 220, isVeg: true }, { id: 71, name: "Veg Peri Peri Fries", price: 190, isVeg: true }, { id: 72, name: "Club Sandwich", price: 240, isVeg: true }]
  },
  { 
    id: 119, name: "Lord of the Drinks", cuisine: "Finger Food, Bar", rating: "4.5 ★", location: "Delhi NCR", price: "₹2,000 for two", category: "nightlife", isVeg: false,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 73, name: "Crispy Corn Chat", price: 290, isVeg: true }, { id: 74, name: "Fish and Chips", price: 480, isVeg: false }, { id: 75, name: "Craft Beer Pint", price: 350, isVeg: true }, { id: 76, name: "Paneer Tikka Pizza", price: 420, isVeg: true }]
  },
  { 
    id: 120, name: "Sutra Pure Veg Lounge", cuisine: "Veg Cocktails, Continental", rating: "4.4 ★", location: "Delhi NCR", price: "₹1,200 for two", category: "nightlife", isVeg: true,
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 77, name: "Cheese Fondue", price: 450, isVeg: true }, { id: 78, name: "Mocktail Sangria", price: 260, isVeg: true }, { id: 79, name: "Bruschetta Platter", price: 310, isVeg: true }, { id: 80, name: "Mushroom Quesadilla", price: 360, isVeg: true }]
  },
  { 
    id: 121, name: "Cyber Hub Social", cuisine: "Pub Food, Cocktails", rating: "4.6 ★", location: "Delhi NCR", price: "₹1,800 for two", category: "nightlife", isVeg: false,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 81, name: "Social Cheese Burger", price: 340, isVeg: true }, { id: 82, name: "BBQ Chicken Pizza", price: 460, isVeg: false }, { id: 83, name: "Cocktail Pitcher", price: 890, isVeg: true }, { id: 84, name: "Chilli Paneer", price: 320, isVeg: true }]
  },
  { 
    id: 122, name: "Veda Pure Veg Bar", cuisine: "Fine Dining, Drinks", rating: "4.5 ★", location: "Delhi NCR", price: "₹1,500 for two", category: "nightlife", isVeg: true,
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 85, name: "Truffle Fries", price: 290, isVeg: true }, { id: 86, name: "Sparkling Mocktail", price: 280, isVeg: true }, { id: 87, name: "Stuffed Mushrooms", price: 340, isVeg: true }, { id: 88, name: "Veg Sizzler", price: 490, isVeg: true }]
  },
  { 
    id: 123, name: "Hard Rock Cafe", cuisine: "American, Rock Pub", rating: "4.7 ★", location: "Delhi NCR", price: "₹2,200 for two", category: "nightlife", isVeg: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 89, name: "Legendary Burger", price: 520, isVeg: false }, { id: 90, name: "Jumbo Combo Veg", price: 650, isVeg: true }, { id: 91, name: "Draft Beer", price: 320, isVeg: true }, { id: 92, name: "Brownie Sundae", price: 350, isVeg: true }]
  },
  { 
    id: 124, name: "The Organic Lounge Pure Veg", cuisine: "Organic Drinks, Continental", rating: "4.3 ★", location: "Delhi NCR", price: "₹1,300 for two", category: "nightlife", isVeg: true,
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 93, name: "Avocado Toast", price: 360, isVeg: true }, { id: 94, name: "Detox Green Juice", price: 180, isVeg: true }, { id: 95, name: "Hummus Pita", price: 290, isVeg: true }, { id: 96, name: "Vegan Brownie", price: 220, isVeg: true }]
  },

  // -------------------------------------------------------
  // 📍 MUMBAI - DELIVERY (8 RESTAURANTS)
  // -------------------------------------------------------
  { 
    id: 201, name: "Bademiya Kebabs", cuisine: "Mughlai, Kebabs", rating: "4.4 ★", location: "Mumbai", price: "₹700 for two", category: "delivery", isVeg: false,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 97, name: "Chicken Seekh Kebab", price: 320, isVeg: false }, { id: 98, name: "Baida Roti", price: 380, isVeg: false }, { id: 99, name: "Paneer Tikka Roll", price: 240, isVeg: true }, { id: 100, name: "Chicken Masala", price: 420, isVeg: false }]
  },
  { 
    id: 202, name: "Sardar Pav Bhaji Pure Veg", cuisine: "Street Food, Butter Pav", rating: "4.5 ★", location: "Mumbai", price: "₹350 for two", category: "delivery", isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 101, name: "Butter Pav Bhaji", price: 180, isVeg: true }, { id: 102, name: "Cheese Pav Bhaji", price: 210, isVeg: true }, { id: 103, name: "Masala Pav", price: 90, isVeg: true }, { id: 104, name: "Fresh Lime Soda", price: 60, isVeg: true }]
  },
  { 
    id: 203, name: "Bhagat Tarachand Pure Veg", cuisine: "Pure Veg, Sindhi Thali", rating: "4.4 ★", location: "Mumbai", price: "₹500 for two", category: "delivery", isVeg: true,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 105, name: "Sev Tamatar", price: 220, isVeg: true }, { id: 106, name: "Paneer Bhurji", price: 280, isVeg: true }, { id: 107, name: "Kutchi Chaas", price: 60, isVeg: true }, { id: 108, name: "Butter Roti (4 pcs)", price: 80, isVeg: true }]
  },
  { 
    id: 204, name: "Swati Snacks Pure Veg", cuisine: "Gujarati, Street Food", rating: "4.7 ★", location: "Mumbai", price: "₹650 for two", category: "delivery", isVeg: true,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 109, name: "Panki Chatni", price: 220, isVeg: true }, { id: 110, name: "Baked Handvo", price: 240, isVeg: true }, { id: 111, name: "Sabudana Wada", price: 180, isVeg: true }, { id: 112, name: "Sugarcane Juice", price: 90, isVeg: true }]
  },
  { 
    id: 205, name: "Joey's Pizza", cuisine: "Italian, Deep Dish Pizza", rating: "4.8 ★", location: "Mumbai", price: "₹800 for two", category: "delivery", isVeg: false,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 113, name: "Meaty Feast Pizza", price: 490, isVeg: false }, { id: 114, name: "Paneer Delight Pizza", price: 390, isVeg: true }, { id: 115, name: "Garlic Bread Cheese", price: 180, isVeg: true }, { id: 116, name: "Choco Lava", price: 120, isVeg: true }]
  },
  { 
    id: 206, name: "Guru Kripa Pure Veg", cuisine: "Samosa, Sindhi Snacks", rating: "4.6 ★", location: "Mumbai", price: "₹250 for two", category: "delivery", isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 117, name: "Samosa Chole", price: 90, isVeg: true }, { id: 118, name: "Dal Pakwan", price: 110, isVeg: true }, { id: 119, name: "Sweet Lassi", price: 70, isVeg: true }, { id: 120, name: "Gulab Jamun", price: 60, isVeg: true }]
  },
  { 
    id: 207, name: "Mahesh Lunch Home", cuisine: "Seafood, Mangalorean", rating: "4.5 ★", location: "Mumbai", price: "₹1,200 for two", category: "delivery", isVeg: false,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 121, name: "Surmai Fry", price: 480, isVeg: false }, { id: 122, name: "Prawns Ghee Roast", price: 560, isVeg: false }, { id: 123, name: "Neer Dosa (4 pcs)", price: 120, isVeg: true }, { id: 124, name: "Sol Kadhi", price: 80, isVeg: true }]
  },
  { 
    id: 208, name: "Aaswad Pure Veg", cuisine: "Maharashtrian, Misal Pav", rating: "4.7 ★", location: "Mumbai", price: "₹350 for two", category: "delivery", isVeg: true,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 125, name: "World Famous Misal Pav", price: 140, isVeg: true }, { id: 126, name: "Kothimbir Vadi", price: 110, isVeg: true }, { id: 127, name: "Puran Poli", price: 90, isVeg: true }, { id: 128, name: "Piyush Drink", price: 70, isVeg: true }]
  },

  // -------------------------------------------------------
  // 📍 MUMBAI - DINING OUT (8 RESTAURANTS)
  // -------------------------------------------------------
  { 
    id: 209, name: "Shree Thaker Bhojanalay Pure Veg", cuisine: "Gujarati Thali", rating: "4.8 ★", location: "Mumbai", price: "₹1,000 for two", category: "dining", isVeg: true,
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 129, name: "Unlimited Royal Thali", price: 600, isVeg: true }, { id: 130, name: "Khaman Dhokla", price: 150, isVeg: true }, { id: 131, name: "Basundi", price: 120, isVeg: true }, { id: 132, name: "Aloo Rasawala", price: 220, isVeg: true }]
  },
  { 
    id: 210, name: "Gajalee Seafood", cuisine: "Malvani Seafood", rating: "4.6 ★", location: "Mumbai", price: "₹1,500 for two", category: "dining", isVeg: false,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 133, name: "Tandoori Crab", price: 950, isVeg: false }, { id: 134, name: "Bombil Fry", price: 340, isVeg: false }, { id: 135, name: "Sol Kadhi", price: 90, isVeg: true }, { id: 136, name: "Veg Malvani Curry", price: 280, isVeg: true }]
  },
  { 
    id: 211, name: "Madras Cafe Pure Veg", cuisine: "South Indian, Kaapi", rating: "4.6 ★", location: "Mumbai", price: "₹400 for two", category: "dining", isVeg: true,
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 137, name: "Mysore Masala Dosa", price: 190, isVeg: true }, { id: 138, name: "Upma Podi", price: 110, isVeg: true }, { id: 139, name: "Filter Kaapi", price: 60, isVeg: true }, { id: 140, name: "Medu Vada", price: 130, isVeg: true }]
  },
  { 
    id: 212, name: "Copper Chimney", cuisine: "North Indian, Kebabs", rating: "4.5 ★", location: "Mumbai", price: "₹1,600 for two", category: "dining", isVeg: false,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 141, name: "Reshmi Kebab", price: 420, isVeg: false }, { id: 142, name: "Paneer Tikka", price: 360, isVeg: true }, { id: 143, name: "Dal Maharaja", price: 340, isVeg: true }, { id: 144, name: "Roomali Roti", price: 80, isVeg: true }]
  },
  { 
    id: 213, name: "Cream Centre Pure Veg", cuisine: "Italian, North Indian", rating: "4.4 ★", location: "Mumbai", price: "₹900 for two", category: "dining", isVeg: true,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 145, name: "Original Chana Bhatura", price: 320, isVeg: true }, { id: 146, name: "Sizzling Sizzler", price: 490, isVeg: true }, { id: 147, name: "Nachos with Cheese", price: 310, isVeg: true }, { id: 148, name: "Ice Cream Sundae", price: 210, isVeg: true }]
  },
  { 
    id: 214, name: "TGI Fridays", cuisine: "American, Burger, Steaks", rating: "4.2 ★", location: "Mumbai", price: "₹1,400 for two", category: "dining", isVeg: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 149, name: "Chicken Burger", price: 420, isVeg: false }, { id: 150, name: "Veg Supreme Burger", price: 340, isVeg: true }, { id: 151, name: "Mozzarella Sticks", price: 310, isVeg: true }, { id: 152, name: "Lava Cake", price: 250, isVeg: true }]
  },
  { 
    id: 215, name: "Pritam Da Dhaba", cuisine: "Punjabi, North Indian", rating: "4.6 ★", location: "Mumbai", price: "₹1,300 for two", category: "dining", isVeg: false,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 153, name: "Dhaba Butter Chicken", price: 510, isVeg: false }, { id: 154, name: "Dal Tadka", price: 280, isVeg: true }, { id: 155, name: "Butter Naan", price: 70, isVeg: true }, { id: 156, name: "Chicken Tikka", price: 440, isVeg: false }]
  },
  { 
    id: 216, name: "Revival Pure Veg Dining", cuisine: "Pure Veg Thali & Snacks", rating: "4.5 ★", location: "Mumbai", price: "₹850 for two", category: "dining", isVeg: true,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 157, name: "Royal Thali", price: 480, isVeg: true }, { id: 158, name: "Kaju Butter Masala", price: 340, isVeg: true }, { id: 159, name: "Rabdi Jalebi", price: 160, isVeg: true }, { id: 160, name: "Jeera Rice", price: 190, isVeg: true }]
  },

  // -------------------------------------------------------
  // 📍 MUMBAI - NIGHTLIFE (8 RESTAURANTS)
  // -------------------------------------------------------
  { 
    id: 217, name: "Bastian Bandra", cuisine: "Seafood, European, Drinks", rating: "4.8 ★", location: "Mumbai", price: "₹2,500 for two", category: "nightlife", isVeg: false,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 161, name: "Garlic Prawns", price: 750, isVeg: false }, { id: 162, name: "Truffle Mac Cheese", price: 620, isVeg: true }, { id: 163, name: "Bastian Cheesecake", price: 480, isVeg: true }, { id: 164, name: "Cocktail Glass", price: 850, isVeg: true }]
  },
  { 
    id: 218, name: "Dome InterContinental", cuisine: "Mediterranean, Rooftop Bar", rating: "4.7 ★", location: "Mumbai", price: "₹3,000 for two", category: "nightlife", isVeg: false,
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 165, name: "Hummus Pita Platter", price: 520, isVeg: true }, { id: 166, name: "Grilled Lamb", price: 1100, isVeg: false }, { id: 167, name: "Sangria Glass", price: 750, isVeg: true }, { id: 168, name: "Assorted Tapas", price: 480, isVeg: true }]
  },
  { 
    id: 219, name: "The Green Pub Pure Veg", cuisine: "Pure Veg Cocktails, Snacks", rating: "4.4 ★", location: "Mumbai", price: "₹1,200 for two", category: "nightlife", isVeg: true,
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 169, name: "Veg Cheese Balls", price: 280, isVeg: true }, { id: 170, name: "Fruit Cocktail", price: 320, isVeg: true }, { id: 171, name: "Paneer Satay", price: 340, isVeg: true }, { id: 172, name: "Garlic Toast", price: 190, isVeg: true }]
  },
  { 
    id: 220, name: "Toit Brewery", cuisine: "Craft Beer, Pub Food", rating: "4.6 ★", location: "Mumbai", price: "₹1,800 for two", category: "nightlife", isVeg: false,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 173, name: "Craft Beer Mug", price: 380, isVeg: true }, { id: 174, name: "Woodfired Pizza", price: 520, isVeg: true }, { id: 175, name: "Chicken Wings", price: 410, isVeg: false }, { id: 176, name: "Onion Rings", price: 260, isVeg: true }]
  },
  { 
    id: 221, name: "Prithvi Cafe Pure Veg", cuisine: "Cafe, Desserts, Open Air", rating: "4.7 ★", location: "Mumbai", price: "₹500 for two", category: "nightlife", isVeg: true,
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 177, name: "Irish Coffee", price: 180, isVeg: true }, { id: 178, name: "Stuffed Paratha", price: 160, isVeg: true }, { id: 179, name: "Apple Pie", price: 190, isVeg: true }, { id: 180, name: "Cutting Chai", price: 50, isVeg: true }]
  },
  { 
    id: 222, name: "Tamasha Mumbai", cuisine: "Molecular Gastronomy, Bar", rating: "4.5 ★", location: "Mumbai", price: "₹2,200 for two", category: "nightlife", isVeg: false,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 181, name: "Smoked Cocktail", price: 650, isVeg: true }, { id: 182, name: "Butter Chicken Bao", price: 480, isVeg: false }, { id: 183, name: "Mushroom Galouti", price: 390, isVeg: true }, { id: 184, name: "Truffle Pasta", price: 540, isVeg: true }]
  },
  { 
    id: 223, name: "Veggie Nightclub", cuisine: "Pure Veg Pub & Mocktails", rating: "4.3 ★", location: "Mumbai", price: "₹1,400 for two", category: "nightlife", isVeg: true,
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 185, name: "Spinach Cheese Dip", price: 310, isVeg: true }, { id: 186, name: "Blue Lagoon Mocktail", price: 240, isVeg: true }, { id: 187, name: "Veg Sliders", price: 330, isVeg: true }, { id: 188, name: "Choco Mousse", price: 210, isVeg: true }]
  },
  { 
    id: 224, name: "Aer Rooftop Bar", cuisine: "Cocktails, Lounge Food", rating: "4.8 ★", location: "Mumbai", price: "₹3,500 for two", category: "nightlife", isVeg: false,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400",
    menu: [{ id: 189, name: "Signature Martini", price: 950, isVeg: true }, { id: 190, name: "Sushi Platter", price: 820, isVeg: false }, { id: 191, name: "Edamame Beans", price: 460, isVeg: true }, { id: 192, name: "Prawn Tempura", price: 780, isVeg: false }]
  }
];