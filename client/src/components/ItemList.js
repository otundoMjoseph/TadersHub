// itemlist.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './itemlist.css';
import Search from './Search'; // Import the Search component

const ItemImage = ({ src, alt }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://t3.ftcdn.net/jpg/00/70/61/08/360_F_70610892_f7pJ3mCdG32mF6k6bEVKjJhwyvcn4c8a.webp';
  };

  return <img src={src} alt={alt} onError={handleImageError} />;
};

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://taders-backend-12.onrender.com/items')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setItems(data);
        setFilteredItems(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const deleteItem = (id) => {
    fetch(`https://taders-backend-12.onrender.com/deleteitems/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setItems(items.filter(item => item.id !== id));
        setFilteredItems(filteredItems.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('There was a problem with the delete operation:', error);
      });
  };

  const placeOrder = (itemId) => {
    const selectedItem = items.find(item => item.id === itemId);

    if (!selectedItem) {
      console.error(`Item with id ${itemId} not found`);
      return;
    }

    fetch('https://taders-backend-12.onrender.com/addorders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: selectedItem.title,
        description: selectedItem.description,
        price: selectedItem.price.toString(),
        imageurl: selectedItem.imageurl,
        category_id: selectedItem.category_id,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Order placed successfully');
        // Optionally update UI or notify user
      })
      .catch(error => {
        console.error('There was a problem with placing the order:', error);
      });
  };

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <Search onSearch={handleSearch} />
      <div className="item-list-container">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className="item-card">
              <Link to={`/items/${item.id}`}>
                <ItemImage src={item.imageurl} alt={item.title} />
                <p className="title">{item.title}</p>
                <p className="price">${item.price}</p>
                <p className="description">{item.description}</p>
              </Link>
              <button onClick={() => deleteItem(item.id)}>Not interested?</button>
              <button onClick={() => placeOrder(item.id)}>Place Order</button>
            </div>
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

export default ItemList;