import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Імпорт компонентів
import Menu from '../components/Menu';
import Home from '../components/Home';
import Browse from '../components/Browse';
import Search from '../components/Search';
import About from '../components/About';


const BasicRoute = () => {
    return (
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    );
  };
  

export default BasicRoute;
