import React, { useState } from "react";
import "./FeedbackForm.css";
function FeedbackForm() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const submitModal =() => {
    setModal(!modal)
    alert("Thank you for your feedback!");
  };
  const [productPurchased, setProductPurchased] = useState("");
  const [usersname, setUsersname] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
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
              !this is where i should change to show the item which was purchased
              <option value="">Select purchased product</option>
              {(() => (
                <option ></option>
              ))}
            </select>
            <label htmlFor="name">Name:</label>
            <input
            id="name"
            name="name" 
            type="name"
            value={usersname}
            onChange={(e) => setUsersname(e.target.value)}/>
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
            <button onClick={submitModal}>
              Submit feedback
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default FeedbackForm;