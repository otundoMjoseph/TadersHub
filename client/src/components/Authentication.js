import React, { useState } from 'react';
import './authe.css';

function Authentication({ onClose, onLoginSuccess }) {
    const [action, setAction] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const handleClose = () => {
        onClose();
    };

    const handleLogin = () => {
        fetch('https://taders-backend-12.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Login failed');
                }
            })
            .then(data => {
                console.log('Login successful:', data);
                localStorage.setItem('token', data.token);
                fetchUserData(data.token);
            })
            .catch(error => {
                console.error('Error during login:', error);
                setError('Invalid email or password');
            });
    };

    const handleSignup = () => {
        fetch('https://taders-backend-12.onrender.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(error => {
                        throw new Error(error.message || 'Signup failed');
                    });
                }
            })
            .then(data => {
                console.log('Signup successful:', data);
    
                // Resetting bio, avatar, and location to default values
                const defaultUserDetails = {
                    avatar: 'https://via.placeholder.com/150',
                    username: data.user.username,
                    email: data.user.email,
                    location: 'Unknown',
                    bio: 'No bio provided',
                };
    
                // Pass the newly created user data to parent component
                onLoginSuccess(defaultUserDetails);
                onClose();
            })
            .catch(error => {
                console.error('Error during signup:', error);
                setError(error.message || 'Signup failed');
            });
    };
    

    const fetchUserData = (token) => {
        fetch('https://taders-backend-12.onrender.com/current_user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch user data');
                }
            })
            .then(data => {
                console.log('User data:', data);
                onLoginSuccess(data); // Pass user data to parent component
                onClose();
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    const switchAction = () => {
        setAction(action === 'Login' ? 'Sign Up' : 'Login');
        setError(null); // Clear any previous errors when switching action
    };

    return (
        <div className="auth-container">
            <div className="overlay" onClick={handleClose}></div>
            <div className="auth-box">
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                    <button className="close-btn" onClick={handleClose}>X</button>
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="inputs">
                    {action === 'Sign Up' && (
                        <div className="input">
                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    )}

                    <div className="input">
                        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="input">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                {action === 'Login' && (
                    <div className="forgot-password">
                        Forgot Password? <span>Click Here!</span>
                    </div>
                )}

                <div className="submit-container">
                    <div
                        className={action === 'Sign Up' ? 'submit gray' : 'submit'}
                        onClick={action === 'Login' ? handleLogin : handleSignup}
                    >
                        {action === 'Login' ? 'Login' : 'Sign Up'}
                    </div>
                    <div
                        className={action === 'Login' ? 'submit gray' : 'submit'}
                        onClick={switchAction}
                    >
                        Switch to {action === 'Login' ? 'Sign Up' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authentication;