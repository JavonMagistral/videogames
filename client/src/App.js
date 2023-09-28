import './App.css';
import HomePage from './components/HomePage/HomePage';
import LandingPage from './components/LandingPage/LandingPage';
import NewVideoGame from './components/NewVideoGame/NewVideoGame'; 
import About from './components/About/About';
import Detail from './components/Details/Details';
import { Routes, Route , useLocation} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const location = useLocation();
  

  return (
    <div className="App">
      { location.pathname !== "/" && <Nav/>}
   
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<HomePage  />}/>
        <Route path="/NewVideoGame" element={<NewVideoGame/>}/>
        <Route path="/About" element={<About/>}/> 
        <Route path='/Detail/:id' element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;


