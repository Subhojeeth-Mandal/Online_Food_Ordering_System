import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Utensils, Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const { user, cart, logout } = useApp();
  const { darkMode, toggleDarkMode } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <Utensils size={28} /> QuickEats
        </Link>
        <div className="nav-links">
          {user && (<Link to="/orders" className="nav-item">My Orders</Link>)}
          <Link to="/cart" className="nav-item">
            <ShoppingCart size={22} />
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </Link>
          {user ? (
            <div className="nav-links">
              <span className="nav-item" style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <User size={18} /> {user.name.split(' ')[0]}
              </span>
              <button onClick={handleLogout} className="nav-item logout-btn">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="auth-btn">Login</Link>
          )}
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
