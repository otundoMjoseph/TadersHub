import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FeedbackList from './FeedbackList';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then(response => response.json())
      .then(data => setItem(data));
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <h1>{item.name}</h1>
      <img src={item.image_url} alt={item.name} style={{ maxWidth: '400px' }} />
      <p>{item.description}</p>
      <p>Category ID: {item.category_id}</p>
      <p>Price: ${item.price}</p>
      <h2>Feedbacks</h2>
      <FeedbackList itemId={id} />
    </div>
  );
};

export default ItemDetail;
