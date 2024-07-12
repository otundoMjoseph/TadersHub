import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import Authentication from './Authentication';

const UserProfile = () => {
  const defaultUserDetails = {
    avatar: 'https://via.placeholder.com/150',
    username: 'Kimani Justin',
    email: 'kimani.justin@gmail.com',
    location: 'Nairobi',
    bio: 'This is my bio',
  };

  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState(() => {
    const savedDetails = localStorage.getItem('userDetails');
    return savedDetails ? JSON.parse(savedDetails) : defaultUserDetails;
  });
  const [newDetails, setNewDetails] = useState({ ...userDetails });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

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

  const handleOpenProfileModal = () => {
    if (!isLoggedIn) {
      setShowAuthPopup(true);
    } else {
      setShowProfileModal(true);
    }
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  const handleOpenAuthPopup = () => {
    setShowAuthPopup(true);
  };

  const handleCloseAuthPopup = () => {
    setShowAuthPopup(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setShowAuthPopup(false);
    setShowProfileModal(true); // Open profile modal after successful login
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setShowProfileModal(false);
  };

  return (
    <>
      <button onClick={handleOpenProfileModal} className="btn-modal">
        View Profile
      </button>

      {showProfileModal && (
        <div className="modal">
          <div onClick={handleCloseProfileModal} className="overlay"></div>
          <div className="modal-content">
            <div className="profile-header">
              <h1>My Profile</h1>
              <button className="view-profile" onClick={handleEditClick}>
                Update
              </button>
              <button className="logout-btn" onClick={handleLogoutClick}>
                Logout
              </button>
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
        </div>
      )}

      {showAuthPopup && (
        <div className="modal">
          <div onClick={handleCloseAuthPopup} className="overlay"></div>
          <div className="modal-content">
            <Authentication onClose={handleCloseAuthPopup} onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
