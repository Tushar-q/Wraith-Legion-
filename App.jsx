import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Star, Clock, AlertTriangle, CheckCircle, ShieldAlert, 
  Search, History, X, Utensils, ArrowLeft, Plus, Minus, Tag, Percent, 
  CreditCard, Wallet, Banknote, Filter, Sparkles, Terminal, Activity, Zap
} from 'lucide-react';

const RESTAURANTS = [
  {
    id: "R1",
    name: "Meghana Foods",
    cuisine: "Biryani, South Indian, North Indian",
    rating: "4.5",
    time: "25-30 mins",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80",
    coupons: [
      { code: "MEGHANA50", discount: 50, minOrder: 300, desc: "₹50 OFF on orders above ₹300" }
    ],
    categories: {
      "Starters": [
        { id: 101, name: "Chicken 65", price: 260, isVeg: false, desc: "Deep-fried spicy chicken tossed with curry leaves." },
        { id: 102, name: "Paneer 65", price: 230, isVeg: true, desc: "Crispy fried cottage cheese cubes in spicy yoghurt sauce." },
        { id: 108, name: "Gobi Manchurian", price: 210, isVeg: true, desc: "Cauliflower florets tossed in tangy Indo-Chinese sauce." }
      ],
      "Main Course": [
        { id: 103, name: "Special Chicken Biryani", price: 340, isVeg: false, desc: "Signature spicy biryani served with marinated chicken." },
        { id: 104, name: "Paneer Biryani", price: 290, isVeg: true, desc: "Fragrant basmati rice layered with fresh cottage cheese." },
        { id: 105, name: "Mutton Biryani", price: 420, isVeg: false, desc: "Tender slow-cooked mutton cooked in fragrant spices." }
      ],
      "Desserts": [
        { id: 106, name: "Double Ka Meetha", price: 120, isVeg: true, desc: "Hyderabadi bread pudding soaked in saffron milk." }
      ],
      "Beverages": [
        { id: 107, name: "Masala Butter Milk", price: 50, isVeg: true, desc: "Refreshing churned yogurt spiced with herbs." }
      ]
    }
  },
  {
    id: "R2",
    name: "Truffles",
    cuisine: "American, Burgers, Desserts",
    rating: "4.6",
    time: "20-25 mins",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
    coupons: [
      { code: "TRUFFLES100", discount: 100, minOrder: 500, desc: "Flat ₹100 OFF on orders above ₹500" }
    ],
    categories: {
      "Starters": [
        { id: 201, name: "Peri Peri Fries", price: 140, isVeg: true, desc: "Crispy skin-on potato fries with peri peri spice." },
        { id: 202, name: "BBQ Chicken Wings", price: 250, isVeg: false, desc: "Smoky glazed chicken wings served with ranch dip." }
      ],
      "Main Course": [
        { id: 203, name: "All American Cheese Burger", price: 260, isVeg: false, desc: "Juicy beef patty loaded with melted cheddar cheese." },
        { id: 204, name: "Classic Mushroom Burger", price: 230, isVeg: true, desc: "Grilled mushroom patty topped with garlic mayo." },
        { id: 205, name: "Creamy Alfredo Pasta", price: 280, isVeg: true, desc: "Penne in rich parmesan cream sauce." }
      ],
      "Desserts": [
        { id: 206, name: "Sizzling Brownie", price: 180, isVeg: true, desc: "Warm chocolate brownie served with vanilla ice cream." }
      ],
      "Beverages": [
        { id: 207, name: "Oreo Thickshake", price: 160, isVeg: true, desc: "Blended ice cream shake with crushed Oreos." }
      ]
    }
  },
  {
    id: "R3",
    name: "Corner House Ice Cream",
    cuisine: "Desserts, Ice Cream, Shakes",
    rating: "4.8",
    time: "15-20 mins",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&auto=format&fit=crop&q=80",
    coupons: [],
    categories: {
      "Starters": [],
      "Main Course": [],
      "Desserts": [
        { id: 301, name: "Death By Chocolate", price: 310, isVeg: true, desc: "Layers of cake, ice cream, fudge sauce, and nuts." },
        { id: 302, name: "Hot Fudge Sundae", price: 190, isVeg: true, desc: "Vanilla ice cream topped with warm hot fudge." },
        { id: 303, name: "Trilogy Sundae", price: 240, isVeg: true, desc: "Strawberry, chocolate, and vanilla scoops with fresh toppings." }
      ],
      "Beverages": [
        { id: 304, name: "Cold Coffee Shake", price: 130, isVeg: true, desc: "Rich coffee blended with chocolate syrup." }
      ]
    }
  },
  {
    id: "R4",
    name: "Empire Restaurant",
    cuisine: "Mughlai, North Indian, Kebabs",
    rating: "4.3",
    time: "30-35 mins",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80",
    coupons: [
      { code: "EMPIRE20", discount: 40, minOrder: 250, desc: "₹40 OFF on orders above ₹250" }
    ],
    categories: {
      "Starters": [
        { id: 401, name: "Chicken Tikka", price: 290, isVeg: false, desc: "Charcoal-grilled marinated chicken skewers." },
        { id: 402, name: "Paneer Tikka", price: 250, isVeg: true, desc: "Spiced paneer cubes roasted in a tandoor." }
      ],
      "Main Course": [
        { id: 403, name: "Butter Chicken", price: 320, isVeg: false, desc: "Tender chicken cooked in rich tomato butter gravy." },
        { id: 404, name: "Paneer Butter Masala", price: 270, isVeg: true, desc: "Fresh cottage cheese cubes in rich cashew gravy." },
        { id: 405, name: "Garlic Butter Naan", price: 60, isVeg: true, desc: "Tandoori flatbread topped with garlic and butter." }
      ],
      "Desserts": [
        { id: 406, name: "Gulab Jamun (2 pcs)", price: 80, isVeg: true, desc: "Warm milk-solid dumplings in sugar syrup." }
      ],
      "Beverages": [
        { id: 407, name: "Sweet Lassi", price: 70, isVeg: true, desc: "Traditional sweetened yogurt drink." }
      ]
    }
  },
  {
    id: "R5",
    name: "Nagarjuna",
    cuisine: "Andhra, Biryani, South Indian",
    rating: "4.7",
    time: "20-25 mins",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&auto=format&fit=crop&q=80",
    coupons: [
      { code: "ANDHRA75", discount: 75, minOrder: 400, desc: "₹75 OFF on orders above ₹400" }
    ],
    categories: {
      "Starters": [
        { id: 501, name: "Nagarjuna Chicken Roast", price: 310, isVeg: false, desc: "Fiery spicy Andhra style dry chicken roast." },
        { id: 502, name: "Chilli Paneer", price: 240, isVeg: true, desc: "Sautéed cottage cheese with green chillies and capsicum." }
      ],
      "Main Course": [
        { id: 503, name: "Andhra Meal (Veg Thali)", price: 260, isVeg: true, desc: "Traditional banana leaf meal with rice, pappu, and rasam." },
        { id: 504, name: "Chicken Biryani Thali", price: 360, isVeg: false, desc: "Authentic Andhra spicy chicken biryani with salan." }
      ],
      "Desserts": [
        { id: 505, name: "Payasam", price: 100, isVeg: true, desc: "Traditional rice pudding infused with cardamom and nuts." }
      ],
      "Beverages": [
        { id: 506, name: "Fresh Lime Soda", price: 60, isVeg: true, desc: "Zesty sparkling lime drink." }
      ]
    }
  },
  {
    id: "R6",
    name: "Leon Grill",
    cuisine: "Burgers, Wraps, Fast Food",
    rating: "4.4",
    time: "25-30 mins",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80",
    coupons: [
      { code: "LEON30", discount: 30, minOrder: 200, desc: "Flat ₹30 OFF on orders above ₹200" }
    ],
    categories: {
      "Starters": [
        { id: 601, name: "Grilled Chicken Strips", price: 210, isVeg: false, desc: "Herb-marinated grilled chicken breast strips." },
        { id: 602, name: "Cheesy Garlic Bread", price: 160, isVeg: true, desc: "Toasted baguette loaded with melted mozzarella." }
      ],
      "Main Course": [
        { id: 603, name: "Leon Special Jumbo Burger", price: 270, isVeg: false, desc: "Double patty burger with house sauce and jalapeños." },
        { id: 604, name: "Falafel Wrap", price: 190, isVeg: true, desc: "Crispy chickpea falafel patties wrapped in pita with hummus." }
      ],
      "Desserts": [
        { id: 605, name: "Choco Lava Cake", price: 110, isVeg: true, desc: "Warm chocolate cake with molten core." }
      ],
      "Beverages": [
        { id: 606, name: "Mint Lemonade", price: 80, isVeg: true, desc: "Chilled mint and lemon crusher." }
      ]
    }
  },
  {
    id: "R7",
    name: "Glen's Bakehouse",
    cuisine: "Bakery, Pizza, Desserts",
    rating: "4.6",
    time: "20-30 mins",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
    coupons: [
      { code: "GLENS50", discount: 50, minOrder: 350, desc: "₹50 OFF on bakery delicacies" }
    ],
    categories: {
      "Starters": [
        { id: 701, name: "Bruschetta Classic", price: 180, isVeg: true, desc: "Toasted bread with seasoned tomatoes and basil." }
      ],
      "Main Course": [
        { id: 702, name: "Margherita Woodfired Pizza", price: 320, isVeg: true, desc: "Classic mozzarella cheese and tomato sauce base." },
        { id: 703, name: "Roast Chicken Pizza", price: 390, isVeg: false, desc: "Smoked chicken, caramelized onions, and bell peppers." }
      ],
      "Desserts": [
        { id: 704, name: "Red Velvet Cupcake", price: 90, isVeg: true, desc: "Moist red velvet cake topped with cream cheese frosting." },
        { id: 705, name: "Blueberry Cheesecake", price: 210, isVeg: true, desc: "Creamy baked cheesecake with blueberry compote." }
      ],
      "Beverages": [
        { id: 706, name: "Iced Caramel Macchiato", price: 170, isVeg: true, desc: "Espresso with cold milk and rich caramel drizzle." }
      ]
    }
  },
  {
    id: "R8",
    name: "Bawarchi",
    cuisine: "Hyderabadi, Biryani, Mughlai",
    rating: "4.4",
    time: "30-40 mins",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80",
    coupons: [
      { code: "BAWARCHI60", discount: 60, minOrder: 350, desc: "₹60 OFF on orders above ₹350" }
    ],
    categories: {
      "Starters": [
        { id: 801, name: "Chicken Reshmi Kebab", price: 310, isVeg: false, desc: "Melt-in-mouth creamy marinated chicken kebabs." },
        { id: 802, name: "Veg Hara Bhara Kebab", price: 220, isVeg: true, desc: "Spiced spinach and green pea patties." }
      ],
      "Main Course": [
        { id: 803, name: "Hyderabadi Dum Biryani", price: 350, isVeg: false, desc: "Slow Dum cooked basmati rice with spiced chicken." },
        { id: 804, name: "Kadhai Paneer", price: 280, isVeg: true, desc: "Cottage cheese cooked in spicy bell pepper gravy." }
      ],
      "Desserts": [
        { id: 805, name: "Shahi Tukda", price: 130, isVeg: true, desc: "Crispy fried bread soaked in saffron rabri." }
      ],
      "Beverages": [
        { id: 806, name: "Rose Milk", price: 70, isVeg: true, desc: "Chilled rose syrup milk drink." }
      ]
    }
  }
];

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeFading, setWelcomeFading] = useState(false);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartRestaurant, setCartRestaurant] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [conflictModal, setConflictModal] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('CARD');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [liveLogs, setLiveLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const [chaosState, setChaosState] = useState({
    authExpired: false,
    rateLimitExceeded: false,
    schemaValidation: false,
    inventoryMismatch: false,
    thirdPartyOutage: false,
    dbPoolExhausted: false,
    paymentSlowdown: false,
    dbDeadlock: false,
    silentCorruption: false,
    raceCondition: false,
    memoryLeak: false,
    cascadingFailure: false
  });

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setWelcomeFading(true);
    }, 2400);

    const closeTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  const addLog = (message, type = 'info') => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      text: message,
      type
    };
    setLiveLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  const toggleChaos = async (key) => {
    const updated = { ...chaosState, [key]: !chaosState[key] };
    setChaosState(updated);
    addLog(`Chaos toggle changed: ${key} = ${updated[key]}`, 'warn');
    try {
      await fetch('http://localhost:5000/api/admin/chaos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      addLog(`Failed to sync chaos toggle with backend`, 'error');
    }
  };

  const addToCart = (dish, restaurant) => {
    if (cart.length > 0 && cartRestaurant?.id !== restaurant.id) {
      setConflictModal({ dish, restaurant });
      return;
    }
    if (cart.length === 0) {
      setCartRestaurant({ id: restaurant.id, name: restaurant.name });
    }

    const existingIndex = cart.findIndex(item => item.dish.id === dish.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { dish, quantity: 1 }]);
    }
    addLog(`Added to cart: ${dish.name} (x1)`, 'info');
  };

  const updateQuantity = (dishId, delta) => {
    const updated = cart.map(item => {
      if (item.dish.id === dishId) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCart(updated);
    if (updated.length === 0) {
      setCartRestaurant(null);
      setAppliedCoupon(null);
    }
  };

  const clearAndAddNew = () => {
    if (conflictModal) {
      setCart([{ dish: conflictModal.dish, quantity: 1 }]);
      setCartRestaurant({ id: conflictModal.restaurant.id, name: conflictModal.restaurant.name });
      setAppliedCoupon(null);
      setConflictModal(null);
      addLog(`Cart cleared for new restaurant: ${conflictModal.restaurant.name}`, 'warn');
    }
  };

  const applyCoupon = (coupon) => {
    if (subtotal < coupon.minOrder) {
      setNotification({ type: 'error', text: `Minimum order of ₹${coupon.minOrder} required for ${coupon.code}.` });
      return;
    }
    setAppliedCoupon(coupon);
    setNotification({ type: 'success', text: `Coupon ${coupon.code} applied!` });
    addLog(`Applied coupon ${coupon.code}`, 'info');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setNotification({ type: 'success', text: "Coupon removed." });
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.dish.price * item.quantity), 0);
  const couponDiscount = appliedCoupon && subtotal >= appliedCoupon.minOrder ? appliedCoupon.discount : 0;
  
  let paymentPerkAmount = 0;
  if (paymentMethod === 'CARD') paymentPerkAmount = -30;
  else if (paymentMethod === 'UPI') paymentPerkAmount = -15;
  else if (paymentMethod === 'COD') paymentPerkAmount = 25;

  const platformFee = cart.length > 0 ? 7 : 0;
  const taxableAmount = Math.max(0, subtotal - couponDiscount);
  const gstTax = Math.round(taxableAmount * 0.05);
  const grandTotal = Math.max(0, taxableAmount + paymentPerkAmount + platformFee + gstTax);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    setNotification(null);
    const traceId = `TRC-${Math.floor(100000 + Math.random() * 900000)}`;

    addLog(`[${traceId}] Initiating checkout: ₹${grandTotal} via ${paymentMethod}...`, 'info');

    try {
      const response = await fetch('http://localhost:5000/api/v1/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-trace-id': traceId
        },
        body: JSON.stringify({ items: cart, totalAmount: grandTotal, restaurant: cartRestaurant, paymentMethod })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const finalCharged = data.chargedAmount || grandTotal;
        setNotification({ type: 'success', text: `Order Placed! ID: ${data.orderId}` });
        setOrderHistory([{ id: data.orderId, date: new Date().toLocaleTimeString(), total: finalCharged, restaurant: cartRestaurant.name, payment: paymentMethod }, ...orderHistory]);
        addLog(`[${traceId}] 200 SUCCESS - Order ${data.orderId} placed. Charged: ₹${finalCharged}`, 'success');
        setCart([]);
        setCartRestaurant(null);
        setAppliedCoupon(null);
        setIsCartOpen(false);
      } else {
        setNotification({ type: 'error', text: data.message || "Order failed." });
        addLog(`[${traceId}] HTTP ${response.status} ERROR - ${data.message}`, 'error');
      }
    } catch (err) {
      setNotification({ type: 'error', text: "Network error: Server unavailable." });
      addLog(`[${traceId}] FATAL - Backend server unreachable`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const activeChaosCount = Object.values(chaosState).filter(Boolean).length;

  const filteredRestaurants = RESTAURANTS.filter(res => 
    res.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    res.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-16 selection:bg-orange-500 selection:text-white relative">
      
      {/* 3-SECOND WELCOME ANIMATION OVERLAY */}
      {showWelcome && (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 transition-all duration-700 ${
          welcomeFading ? 'opacity-0 scale-110 blur-md pointer-events-none' : 'opacity-100 scale-100 blur-0'
        }`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-600/30 via-slate-950/90 to-slate-950 z-0" />

          <div className="relative z-10 flex flex-col items-center space-y-6">
            <div className="relative flex items-center justify-center">
              <div className="w-28 h-28 rounded-full border-2 border-orange-500/40 animate-ping absolute" />
              <div className="w-24 h-24 rounded-full border-2 border-orange-400 border-t-transparent animate-spin absolute" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-2xl shadow-orange-500/50 transform hover:rotate-12 transition">
                <Sparkles className="text-white animate-pulse" size={32} />
              </div>
            </div>

            <div className="text-center space-y-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-orange-950/80 border border-orange-800 text-orange-400 uppercase tracking-widest font-bold">
                AFTERMATH SANDBOX
              </span>
              <h1 className="text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-orange-500 uppercase font-mono">
                WELCOME BACK
              </h1>
              <p className="text-xs font-mono text-slate-400 tracking-wider">
                READY FOR CHAOS TESTING & LOG TRACING
              </p>
            </div>

            <div className="flex items-center gap-1.5 h-6">
              {[40, 75, 30, 95, 60, 100, 45, 80].map((h, i) => (
                <div 
                  key={i} 
                  style={{ height: `${h}%` }} 
                  className="w-1 bg-gradient-to-t from-orange-600 to-amber-400 rounded-full animate-pulse" 
                />
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[11px] text-slate-500 tracking-widest uppercase flex items-center gap-2">
            <Activity size={13} className="text-orange-500 animate-spin" /> SYSTEM INITIALIZED
          </div>
        </div>
      )}

      {/* CHAOS CONTROL PANEL HUD */}
      <div className="bg-slate-900 text-white px-4 py-3 text-xs sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div className="flex items-center gap-2 font-mono text-amber-400 font-bold shrink-0">
            <ShieldAlert size={16} className="text-orange-500 animate-pulse" />
            <span>[AFTERMATH CHAOS PANEL]</span>
            <span className="bg-orange-950 text-orange-400 border border-orange-800 px-2 py-0.5 rounded text-[10px]">
              {activeChaosCount} ACTIVE
            </span>
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
            {[
              { key: 'authExpired', label: '401 Auth' },
              { key: 'rateLimitExceeded', label: '429 RateLimit' },
              { key: 'schemaValidation', label: '400 Schema' },
              { key: 'inventoryMismatch', label: '400 Stock' },
              { key: 'thirdPartyOutage', label: '502 Gateway' },
              { key: 'dbPoolExhausted', label: '504 Pool' },
              { key: 'paymentSlowdown', label: '504 Timeout' },
              { key: 'dbDeadlock', label: '500 Deadlock' },
              { key: 'silentCorruption', label: '200 Mutation Bug' },
              { key: 'raceCondition', label: '409 Race Condition' },
              { key: 'memoryLeak', label: 'Heap Memory Leak' },
              { key: 'cascadingFailure', label: '207 Multi-Fail' }
            ].map(({ key, label }) => (
              <label key={key} className={`flex items-center gap-1 cursor-pointer transition select-none ${
                chaosState[key] ? 'text-red-400 font-bold' : 'hover:text-amber-300'
              }`}>
                <input 
                  type="checkbox" 
                  checked={chaosState[key]} 
                  onChange={() => toggleChaos(key)} 
                  className="accent-red-500 cursor-pointer" 
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* HEADER BAR */}
      <header className="bg-white border-b shadow-sm sticky top-[42px] z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSelectedRestaurant(null)}
              className="text-2xl font-black text-orange-600 tracking-wider flex items-center gap-1.5 hover:opacity-90 transition"
            >
              <Utensils size={24} /> TESTER
            </button>
            <span className="text-xs text-gray-400 border-l pl-3 hidden sm:inline flex items-center gap-1">
              <Zap size={13} className="text-amber-500" /> Indiranagar, Bengaluru
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsTerminalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-mono font-semibold text-gray-700 bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-xl hover:bg-gray-200 transition"
            >
              <Terminal size={15} className="text-emerald-600" />
              <span>Logs ({liveLogs.length})</span>
            </button>

            <button 
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-orange-600 transition"
            >
              <History size={18} />
              <span className="hidden sm:inline">Orders</span>
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-orange-600 transition shadow-sm text-sm"
            >
              <ShoppingBag size={18} />
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="bg-white text-orange-600 text-xs px-2 py-0.5 rounded-full font-black ml-1">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* NOTIFICATION TOAST */}
      {notification && (
        <div className={`max-w-md mx-auto mt-4 p-4 rounded-xl flex items-center gap-3 text-sm font-medium shadow-lg transition-all ${
          notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
          <span>{notification.text}</span>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 mt-8">
        {!selectedRestaurant ? (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Popular Restaurants Near You</h1>
                <p className="text-gray-500 text-xs mt-1">Select a restaurant to explore its menu</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => setVegOnly(!vegOnly)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                    vegOnly 
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-800' 
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Filter size={14} /> Veg Only
                </button>

                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                  <input 
                    type="text"
                    placeholder="Search restaurants or cuisines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((res) => (
                <div 
                  key={res.id} 
                  onClick={() => setSelectedRestaurant(res)}
                  className="bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative">
                    <img src={res.image} alt={res.name} className="h-48 w-full object-cover" />
                    <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[11px] font-bold px-2 py-1 rounded-md backdrop-blur-sm flex items-center gap-1">
                      <Clock size={12} /> {res.time}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-bold text-lg text-gray-900">{res.name}</h2>
                        <p className="text-xs text-gray-500">{res.cuisine}</p>
                      </div>
                      <span className="bg-green-700 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                        <Star size={11} fill="white" /> {res.rating}
                      </span>
                    </div>

                    {res.coupons.length > 0 && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-orange-600 bg-orange-50 font-semibold px-2.5 py-1 rounded-lg border border-orange-100">
                        <Tag size={12} />
                        <span>Use {res.coupons[0].code} for Extra Savings</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => setSelectedRestaurant(null)}
              className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-orange-600 transition mb-6 bg-white border px-3.5 py-2 rounded-xl shadow-sm"
            >
              <ArrowLeft size={16} /> Back to Restaurants
            </button>

            <div className="bg-white border rounded-2xl p-6 mb-8 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedRestaurant.name}</h1>
                <p className="text-xs text-gray-500 mt-1">{selectedRestaurant.cuisine}</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="bg-green-700 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                  <Star size={12} fill="white" /> {selectedRestaurant.rating}
                </span>
                <span className="bg-gray-100 text-gray-700 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1">
                  <Clock size={12} /> {selectedRestaurant.time}
                </span>
              </div>
            </div>

            {selectedRestaurant.coupons.length > 0 && (
              <div className="mb-8 space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                  <Percent size={14} className="text-orange-500" /> Available Restaurant Coupons
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedRestaurant.coupons.map((coupon, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-3.5 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-xs text-orange-700">{coupon.code}</p>
                        <p className="text-[11px] text-gray-600 mt-0.5">{coupon.desc}</p>
                      </div>
                      {appliedCoupon?.code === coupon.code ? (
                        <button 
                          onClick={removeCoupon}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition"
                        >
                          REMOVE
                        </button>
                      ) : (
                        <button 
                          onClick={() => applyCoupon(coupon)}
                          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition"
                        >
                          APPLY
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-10">
              {Object.entries(selectedRestaurant.categories).map(([category, dishes]) => {
                const filteredDishes = vegOnly ? dishes.filter(d => d.isVeg) : dishes;
                if (filteredDishes.length === 0) return null;

                return (
                  <section key={category} className="bg-white border rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4 flex items-center justify-between">
                      <span>{category}</span>
                      <span className="text-xs font-normal text-gray-400">({filteredDishes.length} items)</span>
                    </h2>

                    <div className="space-y-4">
                      {filteredDishes.map((dish) => {
                        const cartItem = cart.find(item => item.dish.id === dish.id);
                        const quantity = cartItem ? cartItem.quantity : 0;

                        return (
                          <div key={dish.id} className="flex justify-between items-start pt-3 first:pt-0 border-t first:border-t-0">
                            <div className="space-y-1 max-w-md">
                              <div className="flex items-center gap-2">
                                <span className={`w-2.5 h-2.5 rounded-full ${dish.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                                <h3 className="font-bold text-gray-800 text-sm">{dish.name}</h3>
                              </div>
                              <p className="text-xs font-semibold text-gray-600">₹{dish.price}</p>
                              <p className="text-xs text-gray-400">{dish.desc}</p>
                            </div>

                            <div>
                              {quantity === 0 ? (
                                <button
                                  onClick={() => addToCart(dish, selectedRestaurant)}
                                  className="px-4 py-1.5 bg-orange-50 text-orange-600 font-bold border border-orange-200 rounded-lg hover:bg-orange-100 transition text-xs"
                                >
                                  ADD +
                                </button>
                              ) : (
                                <div className="flex items-center gap-2 bg-orange-50 border border-orange-300 px-2.5 py-1 rounded-lg text-xs font-bold text-orange-600">
                                  <button onClick={() => updateQuantity(dish.id, -1)}>
                                    <Minus size={14} />
                                  </button>
                                  <span className="w-4 text-center">{quantity}</span>
                                  <button onClick={() => updateQuantity(dish.id, 1)}>
                                    <Plus size={14} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* TERMINAL LOG STREAMER DRAWER */}
      {isTerminalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-slate-900 text-slate-100 border-l border-slate-800 w-full max-w-lg h-full p-6 flex flex-col justify-between font-mono">
            <div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Terminal size={18} className="text-emerald-400" /> LIVE BACKEND LOG STREAM
                </h2>
                <button onClick={() => setIsTerminalOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <div className="mt-4 space-y-2 max-h-[75vh] overflow-y-auto pr-1 text-[11px]">
                {liveLogs.length === 0 ? (
                  <p className="text-slate-500 text-center py-12">No requests triggered yet.</p>
                ) : (
                  liveLogs.map((log) => (
                    <div key={log.id} className={`p-2 rounded border ${
                      log.type === 'error' ? 'bg-red-950/80 border-red-800 text-red-300' :
                      log.type === 'warn' ? 'bg-amber-950/80 border-amber-800 text-amber-300' :
                      log.type === 'success' ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300' :
                      'bg-slate-800 border-slate-700 text-slate-300'
                    }`}>
                      <span className="text-slate-400 mr-2">[{log.timestamp}]</span>
                      <span>{log.text}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button 
              onClick={() => setLiveLogs([])}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
            >
              Clear Logs
            </button>
          </div>
        </div>
      )}

      {/* CONFLICT MODAL */}
      {conflictModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 space-y-4 text-center shadow-xl">
            <AlertTriangle size={36} className="text-orange-500 mx-auto" />
            <h3 className="text-base font-bold text-gray-900">Replace cart items?</h3>
            <p className="text-xs text-gray-500">
              Your cart contains dishes from <span className="font-bold text-gray-800">{cartRestaurant?.name}</span>. Clear your cart to add from <span className="font-bold text-gray-800">{conflictModal.restaurant.name}</span>?
            </p>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setConflictModal(null)} className="w-1/2 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl">
                Cancel
              </button>
              <button onClick={clearAndAddNew} className="w-1/2 py-2 bg-red-600 text-white text-xs font-bold rounded-xl">
                Replace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <ShoppingBag size={20} className="text-orange-500" /> Cart
                  </h2>
                  {cartRestaurant && <p className="text-xs text-gray-500 mt-0.5">From {cartRestaurant.name}</p>}
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1 text-gray-400 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-xs text-gray-400 py-16 text-center">Your cart is empty.</p>
              ) : (
                <div className="mt-4 space-y-3 max-h-[30vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.dish.id} className="flex justify-between items-center text-xs border-b pb-2">
                      <div>
                        <p className="font-bold text-gray-800">{item.dish.name}</p>
                        <p className="text-gray-500">₹{item.dish.price} × {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-800">₹{item.dish.price * item.quantity}</span>
                        <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-lg">
                          <button onClick={() => updateQuantity(item.dish.id, -1)}><Minus size={12} /></button>
                          <span className="font-bold px-1">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.dish.id, 1)}><Plus size={12} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <div className="mt-6 border-t pt-4">
                  <h3 className="text-xs font-bold uppercase text-gray-500 mb-2">Select Payment Method</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'CARD', label: 'Credit / Debit Card', perk: 'Save ₹30 Instant Discount', icon: CreditCard },
                      { id: 'UPI', label: 'UPI / NetBanking', perk: 'Save ₹15 Instant Discount', icon: Wallet },
                      { id: 'COD', label: 'Cash on Delivery', perk: '₹25 Handling Fee Applies', icon: Banknote }
                    ].map((mode) => {
                      const Icon = mode.icon;
                      const isSelected = paymentMethod === mode.id;
                      return (
                        <div 
                          key={mode.id}
                          onClick={() => setPaymentMethod(mode.id)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer flex justify-between items-center transition ${
                            isSelected ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon size={16} className={isSelected ? 'text-orange-600' : 'text-gray-400'} />
                            <div>
                              <p className="font-bold text-gray-800">{mode.label}</p>
                              <p className={`text-[10px] ${mode.id === 'COD' ? 'text-amber-600 font-semibold' : 'text-green-600 font-semibold'}`}>{mode.perk}</p>
                            </div>
                          </div>
                          <input type="radio" checked={isSelected} readOnly className="accent-orange-500" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t pt-4 space-y-3 text-xs mt-4">
                {appliedCoupon && (
                  <div className="flex justify-between items-center bg-green-50 border border-green-200 p-2.5 rounded-xl">
                    <span className="text-green-800 font-bold flex items-center gap-1">
                      <Tag size={12} /> {appliedCoupon.code} Applied
                    </span>
                    <button onClick={removeCoupon} className="text-xs text-red-600 font-bold hover:underline">
                      Remove
                    </button>
                  </div>
                )}

                <div className="space-y-2 text-gray-600 bg-gray-50 p-3.5 rounded-xl border">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-green-700 font-semibold">
                      <span>Coupon Discount ({appliedCoupon.code})</span>
                      <span>-₹{couponDiscount}</span>
                    </div>
                  )}

                  {paymentPerkAmount < 0 && (
                    <div className="flex justify-between text-green-700 font-semibold">
                      <span>Payment Offer ({paymentMethod})</span>
                      <span>-₹{Math.abs(paymentPerkAmount)}</span>
                    </div>
                  )}

                  {paymentPerkAmount > 0 && (
                    <div className="flex justify-between text-amber-700 font-semibold">
                      <span>COD Fee</span>
                      <span>+₹{paymentPerkAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST & Taxes (5%)</span>
                    <span>₹{gstTax}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold text-sm text-gray-900">
                    <span>To Pay</span>
                    <span className="text-orange-600">₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition shadow-md text-xs uppercase"
                >
                  {loading ? "Processing..." : `PAY ₹${grandTotal} VIA ${paymentMethod}`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ORDER HISTORY DRAWER */}
      {isHistoryOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <History size={20} className="text-orange-500" /> Past Orders
                </h2>
                <button onClick={() => setIsHistoryOpen(false)} className="p-1 text-gray-400 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>

              {orderHistory.length === 0 ? (
                <p className="text-xs text-gray-400 py-16 text-center">No orders placed yet.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {orderHistory.map((order, idx) => (
                    <div key={idx} className="p-3.5 bg-gray-50 border rounded-xl text-xs space-y-1">
                      <div className="flex justify-between font-bold text-gray-800">
                        <span>{order.restaurant}</span>
                        <span className="text-green-600 font-mono">{order.id}</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>Paid: ₹{order.total} ({order.payment})</span>
                        <span>{order.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}