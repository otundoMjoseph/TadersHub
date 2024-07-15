import React, { useState, useEffect } from "react";
import "./FeedbackList.css";

function FeedbackList() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetch('https://taders-backend-12.onrender.com/feedbacks')
      .then(response => response.json())
      .then(data => setFeedback(data));
  }, []);

  return (
    <div className="feedback-list-container">
      <h1>Feedback from Customers</h1>

      {feedback.map((feedbackItem, index) => (
        <div key={index} className="feedback-item">
          <h2>{feedbackItem.name}</h2>
          <h3>{feedbackItem.email}</h3>
          <p>{feedbackItem.feedback}</p>
        </div>
      ))}
    </div>
  );
}

export default FeedbackList;
