import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ItemImage = ({ src, alt }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://t3.ftcdn.net/jpg/00/70/61/08/360_F_70610892_f7pJ3mCdG32mF6k6bEVKjJhwyvcn4c8a.webp';
  };

  return <img src={src} alt={alt} onError={handleImageError} style={{ maxWidth: '200px' }} />;
};

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://taders-backend-12.onrender.com/items')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setItems(data))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);

  const deleteItem = (id) => {
    fetch(`https://taders-backend-12.onrender.com/items/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => console.error('There was a problem with the delete operation:', error));
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {items.length > 0 ? (
          items.map(item => (
            <li key={item.id}>
              <Link to={`/items/${item.id}`}>
                <h2>{item.name}</h2>
                <ItemImage src={item.imageurl} alt={item.name} />
                <p>Price: ${item.price}</p>
              </Link>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No items available</p>
        )}
      </ul>
    </div>
  );
};

export default ItemList;
