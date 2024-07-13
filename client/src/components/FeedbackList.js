import React,{useState, useEffect}  from "react";
import "./FeedbackList.css";

function FeedbackList(){
    const [feedback, setFeedback] = useState([]);
    useEffect(() => {
        fetch('https://taders-backend-12.onrender.com/feedbacks')
        .then(response => response.json())
        .then(data => setFeedback(data));
    }, []);
    return (
        <div> 
            <h1>Feedback from customers</h1><br/>

            {feedback.map((feedback)=>( 
            <div>
                <h2>{feedback.name}</h2>
                <h3> {feedback.email}</h3>
                {feedback.feedback}
                
            </div>
        ))}
           
        </div>
    );
}

export default FeedbackList;