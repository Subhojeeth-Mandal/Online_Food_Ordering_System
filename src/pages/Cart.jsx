import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';

const Cart = () => {
  const { cart, updateQty, placeOrder } = useApp();
  const navigate = useNavigate();
  const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty,0);
  const deliveryFee = cart.length > 0 ? 2.99 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const orderId = placeOrder();
    alert(`Order #${orderId} placed successfully!`);
    navigate('/orders');
  };

  const handleRemoveItem = (id, qty) => {updateQty(id, -qty)};

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <ShoppingBag size={80} style={{ color: '#ddd', marginBottom: '20px' }} />
        <h2>Your cart is empty</h2>
        <p style={{ margin: '10px 0 30px', color: '#888' }}>
          Go to home to see more restaurants
        </p>
        <button onClick={() => navigate('/')} className="auth-btn">
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h1 className="section-title">Your Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <img src={item.image} alt={item.name} className="cart-item-img"/>
                <div>
                  <h3>{item.name}</h3>

                  <Link to={`/restaurant/${String(item.id).slice(0, -2)}`} className="restaurant-link">
                    {item.restaurantName}
                  </Link>

                  <p style={{ fontWeight: 700, marginTop: '8px' }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </p>

                  <button className="remove-btn" onClick={() => handleRemoveItem(item.id, item.qty)}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>

              <div className="quantity-controls">
                <button className="q-btn" onClick={() => updateQty(item.id, -1)}>
                  <Minus size={14} />
                </button>
                <span>{item.qty}</span>
                <button className="q-btn" onClick={() => updateQty(item.id, 1)}>
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="summary-card">
          <h3>Order Summary</h3>

          <div style={{ marginTop: '25px' }}>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;