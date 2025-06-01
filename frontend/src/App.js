import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetail from './components/product/ProductDetail';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import Thankyou from './components/cart/Thankyou';

function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
      <div className='container container-fluid'>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/product/:id' element={<ProductDetail/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/shipping' element={<Shipping/>} />
        <Route path='/order/confirm' element={<Thankyou/>} />
      </Routes>
      </div>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
