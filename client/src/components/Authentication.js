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
        fetch('/api/login', {
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
            onLoginSuccess();
            onClose();
        })
        .catch(error => {
            console.error('Error during login:', error);
            setError('Invalid email or password');
        });
    };

    const handleSignup = () => {
        fetch('/api/signup', {
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
                throw new Error('Signup failed');
            }
        })
        .then(data => {
            console.log('Signup successful:', data);
            onLoginSuccess();
            onClose();
        })
        .catch(error => {
            console.error('Error during signup:', error);
            setError('Signup failed');
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
                    {action === 'Sign Up' ? (
                        <div className="input">
                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    ) : null}

                    <div className="input">
                        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="input">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                {action === 'Login' ? (
                    <div className="forgot-password">
                        Forgot Password? <span>Click Here!</span>
                    </div>
                ) : null}

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
