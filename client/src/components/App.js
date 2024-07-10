import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import ItemForm from './components/ItemForm';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import UserProfile from "./UserProfile";
import CategoryList from './components/CategoryList';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/items" component={ItemList} />
        <Route path="/item/:id" component={ItemDetail} />
        <Route path="/create-item" component={ItemForm} />
        <Route path="/place-order" component={OrderForm} /> 
        <Route path="/orders" component={OrderList} /> 
        <Route path="/categories" component={CategoryList} />
        <Route path="/categories/:categoryId" component={CategoryItem} />
        <Route path="/leave-feedback" component={FeedbackForm} />
        <Route path="/search" component={Search} />
      </Switch>
    </div>
  );
}

export default App;
