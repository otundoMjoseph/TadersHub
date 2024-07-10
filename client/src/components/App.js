import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import ItemForm from './ItemForm';
// import OrderForm from './OrderForm';
// import OrderList from './OrderList';
// import UserDetail from './UserDetail';
import CategoryList from './CategoryList';
import FeedbackForm from './FeedbackForm';
// import FeedbackList from './FeedbackList';
import Search from './Search';
import CategoryItem from './CategoryItem';
import './app.css';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/items" component={ItemList} />
        <Route path="/item/:id" component={ItemDetail} />
        <Route path="/create-item" component={ItemForm} />
        {/* <Route path="/place-order" component={OrderForm} />
        <Route path="/orders" component={OrderList} /> */}
        {/* <Route path="/user/:id" component={UserDetail} /> */}
        <Route path="/categories" component={CategoryList} />
        <Route path="/categories/:categoryId" component={CategoryItem} />
        {/* <Route path="/feedback/:itemId" component={FeedbackList} /> */}
        <Route path="/leave-feedback" component={FeedbackForm} />
        <Route path="/search" component={Search} />
      </Switch>
    </div>
  );
}

export default App;
