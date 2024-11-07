import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About';
import Cart from './pages/Cart';
import Troubleshooting from './pages/Troubleshooting';
import Login from './pages/Login';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import Footer from './components/Footer';
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from './components/ScrollToTopButton';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import FAQs from './pages/FAQs';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

const App = () => {
  return (
    <div className='min-h-screen flex flex-col px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />

      <main className='flex-grow mb-10'>
      {/* Routes Per Page */}
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/product-list' element={<ProductList/>} />   
        <Route path='/troubleshooting' element={<Troubleshooting/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/faqs' element={<FAQs/>} />
        <Route path='/terms' element={<Terms/>} />
        <Route path='/privacy' element={<Privacy/>} />
      </Routes>
      <ScrollToTop />

      </main>


      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

export default App
