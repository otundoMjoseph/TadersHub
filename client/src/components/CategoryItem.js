import React, { useState, useEffect } from 'react';
import './catitem.css';

function CategoryItem({ categoryId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    const fetchItemsForCategory = (categoryId) => {
      setLoading(true);
      fetch(`https://taders-backend-12.onrender.com/categories/${categoryId}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`Error fetching items for category ${categoryId}`);
          }
          return res.json();
        })
        .then(data => {
          console.log(`Items for category ${categoryId}:`, data.items);
          setItems(data.items);
          setLoading(false);
        })
        .catch(error => {
          console.error(`Error fetching items for category ${categoryId}:`, error);
          setError(error.message);
          setLoading(false);
        });
    };

    if (categoryId) {
      fetchItemsForCategory(categoryId);
    }
  }, [categoryId]);

  const handleCheckboxChange = (id) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div>
      <h1>Category Items</h1>
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {loading ? (
          <li>Loading items...</li>
        ) : (
          items.length > 0 ? (
            items.map(item => (
              <li key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={!!selectedItems[item.id]}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  {item.title}
                </label>
              </li>
            ))
          ) : (
            <li>No items available</li>
          )
        )}
      </ul>
    </div>
  );
}

export default CategoryItem;
