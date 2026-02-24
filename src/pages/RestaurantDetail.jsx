import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, ChevronLeft, Info } from 'lucide-react';
import data from '../../data.json';
import { useApp } from '../context/AppContext';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addToCart } = useApp();

  const restaurant = data.find(r => r.id === Number(id));
  const [activeCategory, setActiveCategory] = useState(restaurant?.menu?.[0]?.category);

  if (!restaurant) return <div className="error">Restaurant not found</div>;

  const handleAdd = (item) => {
    if (!user) {
      const confirmLogin = window.confirm('You are not logged in. Do you want to login to add items?');
      if (confirmLogin) navigate('/login');
      return;
    }
    addToCart(item, restaurant.name);
  };
  console.log("id",id);
  console.log("restaurant",restaurant)
  return (
    <div className="restaurant-detail-wrapper">
      {/* Hero Section */}
      <div className="hero-banner" style={{ backgroundImage: `url(${restaurant.image})` }}>
        <button onClick={() => navigate(-1)} className="floating-back">
          <ChevronLeft size={40} />
        </button>
      </div>

      <div className="container content-lift">
        {/* Info Card */}
        <div className="restaurant-info-card">
          <div className="info-main">
            <div className="tags">
              {restaurant.cuisine.map(c => <span key={c} className="tag">{c.toUpperCase()}</span>)}
            </div>
            <h1>{restaurant.name}</h1>
            <div className="stats-bar">
              <span><Star size={16} className="icon-orange" /> <b>{restaurant.rating}</b> (850+ reviews)</span>
              <span><Clock size={16} /> 20-30 min</span>
              <span><MapPin size={16} /> {restaurant.address || "456 Oak Avenue, Midtown"}</span>
            </div>
          </div>
          
          <div className="delivery-info">
            <div className="stat-box">
              <p className="label">DELIVERY</p>
              <p className="value">${restaurant.deliveryFee || "1.99"}</p>
            </div>
            <div className="stat-box border-left">
              <p className="label">MIN ORDER</p>
              <p className="value">${restaurant.minOrder || "10"}</p>
            </div>
            <Info size={18} className="info-icon" />
          </div>
        </div>

        {/* Layout: Sidebar + Menu */}
        <div className="menu-layout">
          <aside className="category-sidebar">
            <p className="sidebar-title">CATEGORIES</p>
            <div className="category-scroll">
              {restaurant.menu.map(m => (
                <button
                  key={m.category}
                  className={`sidebar-link ${activeCategory === m.category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(m.category)}>
                  {m.category}
                </button>
              ))}
            </div>
          </aside>
          <main className="menu-content">
            <h2 className="category-heading">{activeCategory}</h2>
            <div className="items-grid">
              {restaurant.menu
                .find(m => m.category === activeCategory)
                ?.items.map(item => (
                  <div key={item.id} className="food-item-card">
                    <div className="item-details">
                      <div className={`diet-indicator ${item.isVegetarian ? 'veg' : 'non-veg'}`}>
                        <div className="dot"></div>
                      </div>
                      
                      <h3>{item.name.toUpperCase()} {item.bestseller && <span className="award-icon">🏆</span>}</h3>
                      <p className="description">{item.description}</p>
                      
                      <div className="price-row">
                        <span className="price">${item.price}</span>
                        <button className="add-btn-dark" onClick={() => handleAdd(item)}> + ADD</button>
                      </div>
                    </div>
                    <div className="item-image-wrapper">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;