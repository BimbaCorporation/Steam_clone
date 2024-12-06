import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Імпорт компонентів
import Menu from '../features/Menu';
import Home from '../features/Home';
import Browse from '../features/Browse';
import Search from '../features/Search';
import About from '../features/About';
import NotFound from '../features/NotFound';


const BasicRoute = () => {
    return (
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  };
  

export default BasicRoute;
