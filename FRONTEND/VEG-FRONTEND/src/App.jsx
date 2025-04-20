
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home'; 
import Signin from './components/loginForm'; 
import AdminDashBoard  from "./pages/adminDashboard";
import ProductDetail from './pages/productDetail';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path = "/admindashboard" element = {<AdminDashBoard/>}/>
        <Route path="/product/:id" element = {<ProductDetail/>}/>
      </Routes>
    </Router>
  );
};

export default App;



