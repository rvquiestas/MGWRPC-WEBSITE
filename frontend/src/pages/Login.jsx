import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [isOtpStep, setIsOtpStep] = useState(false);
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
        if (isOtpStep) {
            // OTP Verification Step
            const response = await axios.post(backendUrl + '/api/user/verify-otp', { email, otp });
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                toast.success("OTP verified successfully!");
                navigate('/');  // Navigate to home page after successful login
            } else {
                toast.error(response.data.message);
            }
        } else if (currentState === 'Sign Up') {
            // Registration Step (No OTP required for registration anymore)
            const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
            if (response.data.success) {
                toast.success("Registration successful!");
                setToken(response.data.token);  // Directly set token after registration
                localStorage.setItem('token', response.data.token);  // Store token in localStorage
                navigate('/');  // Navigate to home page
            } else {
                toast.error(response.data.message);
            }
        } else {
            // Login Step
            const response = await axios.post(backendUrl + '/api/user/login', { email, password });
            if (response.data.success && response.data.otpRequired) {
                toast.info("OTP sent to your email. Please verify.");
                setIsOtpStep(true); // Move to OTP step
            } else if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                navigate('/');  // Navigate to home page after successful login
            } else {
                toast.error(response.data.message);
            }
        }
    } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again.");
    }
};

  useEffect(() => {
    if (token) {
      navigate('/'); // Redirect to home page if token exists
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl 2xl:text-5xl">
          {isOtpStep ? "Verify OTP" : currentState}
        </p>
        <hr className="border-none h-[1.5px] w-8 bg-orangeText" />
      </div>

      {isOtpStep ? (
        <>
          <input
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            type="text"
            className="w-full px-3 py-2 border border-gray-800 2xl:text-2xl"
            placeholder="Enter OTP"
            required
          />
          <button 
            type="button" 
            onClick={() => setIsOtpStep(false)} 
            className="text-sm text-blue-500 mt-2"
          >
            Back to Login
          </button>
        </>
      ) : (
        <>
          {currentState === 'Login' ? '' : (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-3 py-2 border border-gray-800 2xl:text-2xl"
              placeholder="Name"
              required
            />
          )}
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full px-3 py-2 border border-gray-800 2xl:text-2xl"
            placeholder="Email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-full px-3 py-2 border border-gray-800 2xl:text-2xl"
            placeholder="Password"
            required
          />
        </>
      )}

      <div className="w-full text-right text-sm mt-[-8px]">
        {!isOtpStep && (
          currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer 2xl:text-xl">
              Create Account
            </p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className="cursor-pointer 2xl:text-xl">
              Login Here
            </p>
          )
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4 hover:bg-orangeText 2xl:text-xl">
        {isOtpStep ? 'Verify OTP' : currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
