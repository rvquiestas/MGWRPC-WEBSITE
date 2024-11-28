import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import ratingRouter from "./routes/ratingRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

const corsOptions = {
  // origin: ['https://mgwrpc-frontend.vercel.app', 'https://mgwrpc-website.vercel.app','https://localhost:5173'],
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
// middlewares
app.use(express.json());
app.use(cors(corsOptions));

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/rating", ratingRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log("Server started on PORT : " + port));
