import React from 'react';
import { Link } from 'react-router-dom';


function NavBar() {
  return (
    <nav>
      <ul>
         <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/items">Items</Link></li>
        <li><Link to="/create-item">Create Item</Link></li>
        <li><Link to="/place-order">Place Order</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/leave-feedback">Leave Feedback</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;