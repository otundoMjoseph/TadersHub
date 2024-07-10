import React, { useState, useEffect } from 'react';

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('https://api.example.com/orders')
      .then(response => response.json())
      .then(data => {
        setOrders(data.orders);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []); 

  return (
    <div>
      <h2>Orders Pending</h2>
      {orders.length === 0 ? (
        <p>No orders pending.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <strong>Order ID:</strong> {order.id}<br />
              <strong>Item Name:</strong> {order.itemName}<br />
              <strong>Quantity:</strong> {order.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderList;
