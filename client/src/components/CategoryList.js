import React, { useState, useEffect } from 'react';
import CategoryItem from './CategoryItem';
import './catlist.css';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories()
  }, []);

  const fetchCategories = () => {
    fetch('https://taders-backend-12.onrender.com/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  };

  const handleCategoryClick = (categoryId) => {
    // console.log(`Clicked category with ID: ${categoryId}`)
    setSelectedCategory(categoryId) // updates selected cateegory state
  };

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id} onClick={() => handleCategoryClick(category.id)}> 
            {category.name}
          </li>
        ))}
      </ul>
      {selectedCategory && <CategoryItem categoryId={selectedCategory} />}
    </div>
  );
}

export default CategoryList;
