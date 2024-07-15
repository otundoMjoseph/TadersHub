import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import ItemForm from './ItemForm';
// import OrderForm from './OrderForm'; 
import OrderList from './OrderList'; 
import FeedbackForm from './FeedbackForm';
import UserProfile from './UserProfile';
import Authentication from './Authentication';
import './app.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (user) => {
    // Handle successful login, e.g., save user info to localStorage, update state
    setIsLoggedIn(true);
  };

  const handleSignup = (user) => {
    // Handle successful signup, e.g., save user info to localStorage, update state
    setIsLoggedIn(true);
  };

  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/items" component={ItemList} />
        <Route path="/item/:id" component={ItemDetail} />
        <Route path="/create-item" component={ItemForm} />
        {/* <Route path="/place-order" component={OrderForm} />  */}
        <Route path="/orders" component={OrderList} /> 
        <Route path="/leave-feedback" component={FeedbackForm} />
        <Route path="/profile">
          <UserProfile isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="/login">
          <Authentication onLogin={handleLogin} />
        </Route>
        <Route path="/signup">
          <Authentication onSignup={handleSignup} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
