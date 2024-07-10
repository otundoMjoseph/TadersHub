import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const defaultUserDetails = {
    avatar: 'https://via.placeholder.com/150', // Placeholder image URL
    username: 'Kimani Justin',
    email: 'kimani.justin@example.com',
    location: 'Nairobi',
    bio: 'This is my bio',
  };

  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState(() => {
    const savedDetails = localStorage.getItem('userDetails');
    return savedDetails ? JSON.parse(savedDetails) : defaultUserDetails;
  });
  const [newDetails, setNewDetails] = useState({ ...userDetails });

  useEffect(() => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }, [userDetails]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDetails({ ...newDetails, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewDetails({ ...newDetails, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = () => {
    const confirmed = window.confirm('Are you sure you want to change your details?');
    if (confirmed) {
      setUserDetails({ ...newDetails });
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewDetails({ ...userDetails });
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h1>User Profile</h1>
        <button className="update-button" onClick={handleEditClick}>Update</button>
      </div>
      <div className="profile-details">
        <img src={userDetails.avatar} alt="Avatar" className="avatar" />
        <p><strong>Username:</strong> {userDetails.username}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Location:</strong> {userDetails.location}</p>
        <p><strong>Bio:</strong> {userDetails.bio}</p>
        {isEditing && (
          <div className="edit-form">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <input
              type="text"
              name="username"
              value={newDetails.username}
              onChange={handleInputChange}
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              value={newDetails.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="location"
              value={newDetails.location}
              onChange={handleInputChange}
              placeholder="Location"
            />
            <textarea
              name="bio"
              value={newDetails.bio}
              onChange={handleInputChange}
              placeholder="Bio"
            ></textarea>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
