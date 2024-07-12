import React, { useState, useEffect } from 'react';
import './catitem.css';

function CategoryItem({ categoryId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (categoryId) {
      fetchItemsForCategory(categoryId); // fetching items when categoryId changes
    }
  }, [categoryId]);

  const fetchItemsForCategory = (categoryId) => {
    fetch(`https://taders-backend-12.onrender.com/categories/${categoryId}`)
      .then(res => res.json())
      .then(data => {
        console.log(`Items for category ${categoryId}:`, data.items);
        setItems(data.items); 
      })
      .catch(error => console.error(`Error fetching items for category ${categoryId}:`, error));
  };

  return (
    <div>
      <h1>Category Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryItem;
