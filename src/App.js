import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getCookie } from './utils/utils';
import { deleteCookie } from './utils/utils';
import RasaHome from './pages/home/rasahome';
import RasaLogin from './authentication/rasa_login';
import RasaHeader from './header/rasaHeader';
import ProductDetail from './pages/productDetail';
import BrowseProducts from './pages/BrowseProducts';
import TagProducts from './pages/TagProducts';
import Cart from './pages/cart/Cart';
import Orders from './pages/orders';
import OrderItem from './pages/OrderItem';
import WishList from './pages/WishList';
import SearchProducts from './pages/searchproducts';
import Footer from './header/footer';
import SignUp from './authentication/signup';
import ProductTags from './pages/admin/ProductTags';
import Products from './pages/admin/Products';
import Users from './pages/admin/Users';
import CardDetails from './pages/CardDetails';
import AllOrders from './pages/admin/AllOrders';
import UserOrderHistory from './pages/admin/UserOrderHistory';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const token = getCookie('rasatoken');
    setIsAuthenticated(!!token);
    if(token){
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  const onLogin = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  }

  const onLogout = () => {
    deleteCookie('rasatoken'); // delete token from cookie
    setIsAuthenticated(false);
    setUser({});
    localStorage.removeItem('user')
    window.location.href = '/rasa/login';
  }

  return (
    <>
      <Router>
        <RasaHeader isAuthenticated={isAuthenticated} logout={() => onLogout()} loggedInUser={user}/>
        <Routes>
          <Route path="/rasa/login" element={isAuthenticated ? <Navigate to="/rasa/home" /> : <RasaLogin login={(user) => onLogin(user)} />} />
          <Route path="/" element={isAuthenticated ? <RasaHome loggedInUser={user} invalidateToken={() => onLogout()}/> : <Navigate to="/rasa/login" />} />
          <Route path="/rasa/home" element={isAuthenticated ? <RasaHome loggedInUser={user} invalidateToken={() => onLogout()}/> : <Navigate to="/rasa/login" />} />
          <Route path="/rasa/productDetail" element={<ProductDetail loggedInUser={user} invalidateToken={() => onLogout()}/>} />
          <Route path="/rasa/browseproducts" element={<BrowseProducts loggedInUser={user} invalidateToken={() => onLogout()}/>} />
          <Route path="/rasa/tagproducts" element={<TagProducts loggedInUser={user} invalidateToken={() => onLogout()}/>} />
          <Route path="/rasa/cart" element={<Cart loggedInUser={user} invalidateToken={() => onLogout()}/>} />
          <Route path="/rasa/orders" element={<Orders loggedInUser={user} invalidateToken={() => onLogout()}/>} />
          <Route path="/rasa/order" element={<OrderItem loggedInUser={user} invalidateToken={() => onLogout()}/>} />
          <Route path="/rasa/wishlist" element={<WishList loggedInUser={user} invalidateToken={() => onLogout()}/>} />
          <Route path="/rasa/search" element={<SearchProducts loggedInUser={user} invalidateToken={() => onLogout()}/>} />
          <Route path="/rasa/signup" element={<SignUp loggedInUser={user} invalidateToken={() => onLogout()}/>} />
          <Route path="/rasa/tags" element={<ProductTags loggedInUser={user} invalidateToken={() => onLogout()}/>} />
          <Route path="/rasa/products" element={<Products loggedInUser={user} invalidateToken={() => onLogout()}/>} />
          <Route path="/rasa/users" element={<Users loggedInUser={user} invalidateToken={() => onLogout()}/>} />
          <Route path="/rasa/payments" element={<CardDetails loggedInUser={user} invalidateToken={() => onLogout()}/>} />
          <Route path="/rasa/allorders" element={<AllOrders loggedInUser={user} invalidateToken={() => onLogout()}/>} />
          <Route path="/rasa/userorderhistory" element={<UserOrderHistory loggedInUser={user} invalidateToken={() => onLogout()}/>} />
          <Route path="/rasa/salesdashboard" element={<Navigate to="/rasa/home" />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;