// OrderList.js

import React, { useState, useEffect } from 'react';
import './OrderList.css';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://taders-backend-12.onrender.com/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const renderOrders = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error.message}</p>;
    }

    if (orders.length === 0) {
      return <p>No orders pending.</p>;
    }

    return (
      <ul className="list-group">
        {orders.map(order => (
          <li className="list-group-item" key={order.id}>
            <strong>Order ID:</strong> {order.id}<br />
            <strong>Title:</strong> {order.title}<br />
            <strong>Description:</strong> {order.description}<br />
            <strong>Price:</strong> ${order.price}<br />
            <strong>Category ID:</strong> {order.category_id}<br />
            <img src={order.imageurl} alt={order.title} style={{ maxWidth: '200px' }} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="list-container">
      <h2>Orders Pending</h2>
      {renderOrders()}
    </div>
  );
}

export default OrderList;
