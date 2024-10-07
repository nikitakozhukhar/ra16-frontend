import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CatalogItemPage from './pages/CatalogItemPage';
import CatalogPage from './pages/CatalogPage';
import ContactsPage from './pages/ContactsPage';
import Page404 from './pages/Page404';

import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="app">
      <Router basename='/ra16-frontend'>
        <Header /> 
        <Banner />
        <div className="container">
          <Routes>
            <Route exact path='/' element={<HomePage />}/>
            <Route path='/about' element={<AboutPage />}/>
            <Route path='/cart' element={<CartPage />}/>
            <Route path='/catalog' element={<CatalogPage />}/>
            <Route path='/contacts' element={<ContactsPage />}/>
            <Route path='*' element={<Page404 />}/>
          </Routes>
        </div>
        <Footer />
      </Router>
     
    </div>
  );
}

export default App;
