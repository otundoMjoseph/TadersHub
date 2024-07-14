// OrderList.js

import React, { useState, useEffect } from 'react';
import './OrderList.css';
// import Authentication from './Authentication';

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

  // Function to fetch item details for an order
  const fetchItemDetails = (itemId) => {
    return fetch(`https://taders-backend-12.onrender.com/items/${itemId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch item details');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
        return null;
      });
  };

  // Function to render order details with item information
  const renderOrders = () => {
    if (orders.length === 0) {
      return <p>No orders pending.</p>;
    }

    return (
      <ul className="list-group">
        {orders.map(async (order) => {
          // Fetch item details for the order
          const itemDetails = await fetchItemDetails(order.item_id);
          
          return (
            <li className="list-group-item" key={order.id}>
              <strong>Order ID:</strong> {order.id}<br />
              <strong>Quantity:</strong> {order.quantity}<br />
              <strong>Status:</strong> {order.status}<br />
              <strong>User ID:</strong> {order.user}<br />
              {itemDetails && (
                <div>
                  <strong>Item Details:</strong><br />
                  <p><strong>Title:</strong> {itemDetails.title}</p>
                  <p><strong>Description:</strong> {itemDetails.description}</p>
                  <p><strong>Price:</strong> ${itemDetails.price}</p>
                  <img src={itemDetails.imageurl} alt={itemDetails.title} style={{ maxWidth: '200px' }} />
                </div>
              )}
            </li>
          );
        })}
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
