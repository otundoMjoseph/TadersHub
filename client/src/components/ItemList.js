import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/items')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  const deleteItem = (id) => {
    fetch(`/api/items/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setItems(items.filter(item => item.id !== id));
        }
      });
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <Link to={`/items/${item.id}`}>
              <h2>{item.name}</h2>
              <img src={item.image_url} alt={item.name} style={{ maxWidth: '200px' }} />
              <p>Price: ${item.price}</p>
            </Link>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
