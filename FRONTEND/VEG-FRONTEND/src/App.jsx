
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home'; 
import Signin from './components/loginForm'; 
import AdminDashBoard  from "./pages/adminDashboard";
import ProductDetail from './pages/productDetail';
import Navbar from './components/navbar';
import Orders from './pages/orders';
import './App.css';

const App = () => {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path = "/admindashboard" element = {<AdminDashBoard/>}/>
        <Route path="/product/:id" element = {<ProductDetail/>}/>
        <Route path='/orders' element = {<Orders/>} />
      </Routes>
    </Router>
  );
};

export default App;



