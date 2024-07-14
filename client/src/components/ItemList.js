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
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered items
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
        setFilteredItems(data); // Initialize filteredItems with all items
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
        // Update state by filtering out the deleted item
        setItems(items.filter(item => item.id !== id));
        setFilteredItems(filteredItems.filter(item => item.id !== id)); // Also update filteredItems
      })
      .catch(error => {
        console.error('There was a problem with the delete operation:', error);
        // Optionally handle error state here
      });
  };

  const placeOrder = (itemId) => {
    // Find the item details based on itemId
    const selectedItem = items.find(item => item.id === itemId);

    if (!selectedItem) {
      console.error(`Item with id ${itemId} not found`);
      return;
    }

    // Post order with item details
    fetch('https://taders-backend-12.onrender.com/addorders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: selectedItem.id,
        item_details: {
          title: selectedItem.title,
          description: selectedItem.description,
          imageurl: selectedItem.imageurl,
          price: selectedItem.price,
        },
        quantity: 1, // Assuming quantity is fixed for now
        // Additional data if needed
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Handle success (e.g., show success message, update UI)
        console.log('Order placed successfully');
      })
      .catch(error => {
        console.error('There was a problem with placing the order:', error);
        // Optionally handle error state here
      });
  };

  const handleSearch = (query) => {
    if (query.trim() === '') {
      // If query is empty, reset filteredItems to show all items
      setFilteredItems(items);
    } else {
      // Filter items based on the query
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
      <Search onSearch={handleSearch} /> {/* Render the Search component and pass handleSearch as prop */}
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
              <button onClick={() => placeOrder(item.id)}>Place Order</button> {/* Place Order button */}
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
