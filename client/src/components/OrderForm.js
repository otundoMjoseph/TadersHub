import React, { useState } from 'react';
import './OrderForm.css';

function OrderForm() {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1); 

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Order placed for ${quantity} ${itemName}`);
  };

  return (
    <div className="OrderForm">
      <h2>Place an Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
            className="ItemName"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Quantity:
          <input
            className="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
            required
          />
        </label>
        <br />
        <label>
          Category ID:
          <input
            className="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
            required
          />
        </label>
        <br />
        <button className="Orderbtn" type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default OrderForm;