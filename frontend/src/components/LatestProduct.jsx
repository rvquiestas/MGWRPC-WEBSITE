import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

const LatestProduct = () => {

    const { products } = useContext(ShopContext);
    const [ latestProducts, setLatestProducts ]  = useState([]);

    // Includes All Products
    // useEffect(()=>{
    //     setLatestProducts(products.slice(0,10))
    // },[products])

    useEffect(() => {
      // NOTE: Doesn't include Sulit Combo and Others Products
      const filteredProducts = products.filter(item => item.category !== "Sulit Combo" && item.category !== "Others").slice(0, 10).reverse();
      setLatestProducts(filteredProducts);
    }, [products]);

  return (
    <div className='my-10'>
    <div className='flex items-center justify-between py-8'>
        {/* Text on the left */}
        <div className='text-left text-2xl'>
            <Title text1={'LATEST'} text2={'PRODUCTS'} />
        </div>

        {/* Button on the right */}
        <Link to="/product-list">
        <button className='text-darkText text-lg 2xl:text-2xl px-4 py-2 hover:underline decoration-orangeText underline-offset-4 font-medium'>
            See More
        </button>
        </Link>

    </div>

      {/* Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6'>
        {
          latestProducts.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
      </div>

    </div>
  )
}

export default LatestProduct
