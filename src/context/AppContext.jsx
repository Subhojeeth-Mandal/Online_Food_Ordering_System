import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('food_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('food_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('food_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('page_theme');
    return saved ? JSON.parse(saved) : false;
  });
  
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.setAttribute('data-theme', 'dark');
      console.log("Theme set to Dark");
    } else {
      root.setAttribute('data-theme', 'light'); // Set to light explicitly
      console.log("Theme set to Light");
    }
    localStorage.setItem('page_theme', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('food_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('food_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('food_orders', JSON.stringify(orders));
  }, [orders]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const login = (userData) => {setUser(userData);};

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  const addToCart = (item, restaurantName) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1, restaurantName }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>prev.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0));
  };

  const placeOrder = () => {
    const newOrder = {
      id: Date.now(),
      items: [...cart],total: cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0),
      date: new Date().toLocaleDateString(),
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    return newOrder.id;
  };

  return (
    <AppContext.Provider
      value={{ user, login, logout, cart, addToCart, updateQty, placeOrder, orders, darkMode, toggleDarkMode }} >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
