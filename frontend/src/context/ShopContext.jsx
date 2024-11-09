import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₱';
    const delivery_fee = 100;
    const backendUrl = "https://mgwrpc-backend.vercel.app" //backend to frontend
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const [products, setProducts] = useState([]); //backend to frontend
    const [token,setToken] = useState('')
    const navigate = useNavigate();


    const addToCart = async (itemId) => {

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId]){           
            cartData[itemId] += 1; // Increase the quantity if the item exists
            }
            else {
                cartData[itemId] = 1; // Add the item to the cart with a quantity of 1
            } 
        }
        else{
            cartData[itemId] = 1;
        }
    
        setCartItems(cartData); // Update the cartItems state with the new cartData

        if (token) {
            try {
                
                await axios.post(backendUrl + '/api/cart/add', {itemId}, {headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems){
                try {
                    if (cartItems[items]> 0){
                        totalCount += cartItems[items];
                    }
                } catch (error) {

                }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,quantity) => {
        
        let cartData = structuredClone(cartItems);

        cartData[itemId] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                
                await axios.post(backendUrl + '/api/cart/update', {itemId, quantity}, {headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
                try {
                    if (cartItems[items] > 0){
                        totalAmount += itemInfo.price * cartItems[items]
                    }
                } catch (error) {

                }
        }
        return totalAmount;
    }

    // Get Product from the Admin Panel (backend)
    const getProductsData = async () => {
        try {
            
            const response = await axios.get(backendUrl + '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getUserCart = async ( token ) => {
        try {
            
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        products, currency, delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,setCartItems,
        getCartCount,updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken,token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
