import userModel from "./../models/userModel.js";

// Add Products to User Cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Get the user's data
    const userData = await userModel.findById(userId);

    // Initialize cartData if it doesn't exist
    let cartData = userData.cartData || {}; // If cartData is undefined, initialize it as an empty object

    // Update card data
    await userModel.updateOne(
      { _id: userId },
      {
        $set: {
          [`cartData.${itemId}`]:
            // Increment quantity if item already exists in the cart, else default to 1
            cartData && cartData[itemId] ? cartData[itemId] + 1 : 1,
        },
      }
    );

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update User Cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    // Get the user's data
    const userData = await userModel.findById(userId);

    // Initialize cartData if it doesn't exist
    let cartData = userData.cartData || {}; // If cartData is undefined, initialize it as an empty object

    // Update the quantity of the item in the cart
    cartData[itemId] = quantity;

    // Update the user's cart data in the database
    userData.cartData = cartData;
    await userData.save(); // Save the updated user data

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get User Cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // Get the user's data
    const userData = await userModel.findById(userId);

    // Initialize cartData if it doesn't exist
    let cartData = userData.cartData || {}; // If cartData is undefined, initialize it as an empty object

    // Return the user's cart data
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
