import React from 'react'
import Hero from '../components/Hero'
import LatestProduct from '../components/LatestProduct'
import SulitPC from "../components/SulitPC"
import OurPolicy from '../components/OurPolicy'
// import PaymentOpt from '../components/PaymentOpt'
import SulitCombo from '../components/SulitCombo' // new


const Home = () => {
  return (
    <div>
       <Hero />
       <LatestProduct />
       <SulitCombo/>
       <SulitPC />
       <OurPolicy />
       {/* <PaymentOpt /> */}
    </div>
  )
}

export default Home
