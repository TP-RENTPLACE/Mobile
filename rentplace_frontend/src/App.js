import logo from './logo.svg';
import './null.css';
import "./components/Header"
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Categories from './components/Categories';
import Head from './components/Head';
import PropertyCard from './components/PropertyCard';
import PropertiesList from './components/PropertiesList';
function App() {
  return (
    <div className="App">
      <Head/>
      <PropertiesList/>
    </div>
  );
}

export default App;
