import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './components/map';
import Calaendar from './components/calendar';



const App = () => {
  return (
    <Router>
       <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/calendar" element={<Calaendar />} /> 
      </Routes>
    </Router>
    );
};

export default App;
