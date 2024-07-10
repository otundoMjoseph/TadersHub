import React, { useState } from 'react';

function ItemForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category_id, setCategoryId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = { name, description, price, category_id };
    
    fetch('/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
    .then(response => response.json())
    .then(data => console.log(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
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
        Category ID:
        <input type="number" value={category_id} onChange={e => setCategoryId(e.target.value)} />
      </label>
      <button type="submit">Create Item</button>
    </form>
  );
}

export default ItemForm;
