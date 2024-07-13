import React, { useState, useEffect } from "react";
import "./FeedbackForm.css";
import FeedbackList from "./FeedbackList";

function FeedbackForm() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  
  const [productPurchased, setProductPurchased] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [item, setItem] = useState([]);
  useEffect(() => {
    fetch('https://taders-backend-12.onrender.com/items')
      .then(response => response.json())
      .then(data => setItem(data));
  }, []);
  function saveFeedback(){
    
    let data = { name ,email, feedback };

    fetch('https://taders-backend-12.onrender.com/addfeedbacks', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        data
      )
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Response data:", data);
      // Assuming data is returned in the format you expect
    })
    .catch(error => {
      console.error("Error:", error);
    })
    setModal(!modal)
    alert("Thank you for your feedback!");
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  return (
    <>
    
      <button onClick={toggleModal} className="btn-modal">
        Leave us your feedback
      </button>
      
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Share your feedback</h2>
            <label htmlFor="productPurchased">Product Purchased:</label>
            <select 
            id="product_purchased"
            name="product_purchased"
            value={productPurchased}
            onChange={(e) => setProductPurchased(e.target.value)}>
              <option value="">Select purchased product</option>
              {item.map((item) => (
                <option >{item.name}</option>
              ))}
            </select>
            <label htmlFor="name">Name:</label>
            <input
            id="name"
            name="name" 
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}/>
            <label htmlFor="email">Email:</label>
            <input 
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="feedback">Feedback:</label>
            <input
            id="feedback"
            name="feedback" 
            type="feedback"
            value={feedback} 
            onChange={(e) => setFeedback(e.target.value)}/>
            <button onClick={saveFeedback}>
              Submit feedback
            </button>
          </div>
        </div>
      )}
      <FeedbackList/>
    </>
  );
}


export default FeedbackForm;