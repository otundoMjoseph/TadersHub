import React, { useState, useEffect } from 'react';
import './OrderList.css';
import Authentication from './Authentication';

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('https://taders-backend-12.onrender.com/orders')
      .then(response => response.json())
      .then(data => {
        setOrders(data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []); 

  return (
    <div className="list-container">
      <h2>Orders Pending</h2>
      {orders.length === 0 ? (
        <p>No orders pending.</p>
      ) : (
        <ul className="list-group">
          {orders.map(order => (
            <li className="list-group-item" key={order.id}>
              <strong>Order ID:</strong> {order.id}<br />
              <strong>Quantity:</strong> {order.quantity}<br />
              <strong>Status:</strong> {order.status}<br />
              <strong>User ID:</strong> {order.user}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderList;
