import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './itemlist.css';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`https://taders-backend-12.onrender.com/items/${id}`)
      .then(response => response.json())
      .then(data => setItem(data));
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div className="item-detail-container">
      <h1>{item.name}</h1>
      <img src={item.imageurl} alt={item.name} />
      <p>{item.description}</p>
      <p>Category ID: {item.category_id}</p>
      <p className="price">Price: ${item.price}</p>
      <h2>Feedbacks</h2>
      {/* <FeedbackList itemId={id} /> */}
    </div>
  );
};

export default ItemDetail;
