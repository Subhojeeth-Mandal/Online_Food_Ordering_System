import { Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card hover-card">      
      <img src={restaurant.image} alt={restaurant.name} />
      <div className="card-body">
        <h3>{restaurant.name}</h3>
        <p className="muted">
          {restaurant.cuisine.join(' • ')}
        </p>
        <div className="meta">
          <span><Star size={14} /> {restaurant.rating}</span>
          <span><Clock size={14} /> {restaurant.deliveryTime}</span>
        </div>
        <p className="muted">
          Min ${restaurant.minOrder} • Delivery ${restaurant.deliveryFee}
        </p>
      </div>
    </Link>
  );
};

export default RestaurantCard;