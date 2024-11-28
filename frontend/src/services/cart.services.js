import axios from "axios";

const getCartData = async ({ productId }) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_VITE_BACKEND_URL}/api/product/single`,
      {
        productId,
      },
      { headers: { token: localStorage.getItem("token") } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getProducts };
