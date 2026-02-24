import React from 'react';
import { useApp } from '../context/AppContext';
import { Package } from 'lucide-react';

const Orders = () => {
  const { orders } = useApp();

  return (
    <div className="container" style={{padding: '40px 20px'}}>
      <h1 className="section-title">Order History</h1>
      {orders.length === 0 ? (
        <div style={{textAlign: 'center', padding: '60px 0'}}>
          <Package size={60} style={{color: '#ddd', marginBottom: '20px'}} />
          <p>No orders placed yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <p className="order-id">Order #{order.id}</p>
                  <p className="order-date">{order.date}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className="status-delivered">● Delivered</p>
                  <p className="order-total-price">${order.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="order-items-summary">
                {order.items.map(item => (
                  <div key={item.id} className="order-item-row">
                    <span>{item.name} x {item.qty}</span>
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
