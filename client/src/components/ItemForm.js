import React, { useState, useEffect } from 'react';
import './itemform.css';

function ItemForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageurl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState(''); // assuming you have a categoryId state

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!title || !description || !price || !imageurl || !categoryId) {
      alert('Please fill out all fields');
      return;
    }

    const newItem = {
      title: title,
      description: description,
      price: parseFloat(price), // ensure price is sent as a number
      imageurl: imageurl,
      category_id: parseInt(categoryId), // convert to integer if necessary
    };

    setLoading(true);
    setError(null);

    fetch('https://taders-backend-12.onrender.com/additems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then(response => {
        setLoading(false);
        if (!response.ok) {
          throw new Error('Failed to add item');
        }
        return response.json();
      })
      .then(data => {
        console.log('Item added successfully:', data);
        // Optionally reset form fields or show a success message
        setTitle('');
        setDescription('');
        setPrice('');
        setImageUrl('');
        setCategoryId('');
        alert('Item added successfully');
      })
      .catch(error => {
        setLoading(false);
        setError(error.message || 'Unknown error');
        console.error('Error adding item:', error);
      });
  };

  return (
    <div className="item-form-container">
      <div className="item-form-header">
        <h2>Create New Item</h2>
      </div>
      <form className="item-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
        </label>
        <label>
          Image URL:
          <input type="text" value={imageurl} onChange={e => setImageUrl(e.target.value)} />
        </label>
        <label>
          Category ID:
          <input type="number" value={categoryId} onChange={e => setCategoryId(e.target.value)} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Item'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default ItemForm;
