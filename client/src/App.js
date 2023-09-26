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
  const [searchResults, setSearchResults] = useState([]); // Agrega un estado para los resultados

  // Define una función de búsqueda que se pasará a SearchBar
  const handleSearch = async (query) => {
    try {
      // Realiza la solicitud a la API aquí (por ejemplo, utilizando Axios)
      const response = await axios.get(`http://localhost:3001/videogame/?name=${query}`);
      console.log("Searching for:",response.data); 
      // Extrae los resultados de la respuesta
      const results = response.data; // Ajusta esto según la estructura de tu API

      // Actualiza el estado con los resultados
      setSearchResults(results);

    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };

  return (
    <div className="App">
      { location.pathname !== "/" && <Nav onSearch={handleSearch} />}
   
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<HomePage onSearch={handleSearch} />}/>
        <Route path="/NewVideoGame" element={<NewVideoGame/>}/>
        <Route path="/About" element={<About/>}/> 
        <Route path='/Detail/:id' element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;


