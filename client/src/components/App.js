import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import ItemForm from './components/ItemForm';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import UserDetail from './components/UserDetail';
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
        <Route path="/user/:id" component={UserDetail} />
        <Route path="/categories" component={CategoryList} />
        <Route path="/feedback/:itemId" component={FeedbackList} />
        <Route path="/leave-feedback" component={FeedbackForm} />
      </Switch>
    </div>
  );
}

export default App;
