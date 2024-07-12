import React, { useState, useEffect } from 'react';
import './catitem.css';

function CategoryItem() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://taders-backend-12.onrender.com/categories');
        const data = await res.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchItemsForCategory = async (categoryId) => {
      setLoading(true);
      try {
        const res = await fetch(`https://taders-backend-12.onrender.com/categories/${categoryId}`);
        const data = await res.json();
        console.log(`Items for category ${categoryId}:`, data.items);
        setItems(data.items || []); // Ensure that items is an array
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching items for category ${categoryId}:`, error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (selectedCategory) {
      fetchItemsForCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCheckboxChange = (id) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <h1>Category Items</h1>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select a Category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
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
