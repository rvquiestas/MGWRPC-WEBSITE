import axios from "axios";

const handlePostRating = async ({ productId, orderId, rate, remarks }) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_VITE_BACKEND_URL}/api/rating`,
      {
        productId,
        orderId,
        rate,
        remarks,
      },
      { headers: { token: localStorage.getItem("token") } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const handleGetRating = async ({ productId }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_VITE_BACKEND_URL}/api/rating?productId=${productId}`,
      { headers: { token: localStorage.getItem("token") } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export { handlePostRating, handleGetRating };
