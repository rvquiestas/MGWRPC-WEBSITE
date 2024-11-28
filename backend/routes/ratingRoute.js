import express from "express";
import {
  getProductRating,
  postProductRating,
} from "../controllers/ratingController.js";
import authUser from "../middleware/auth.js";

const ratingRouter = express.Router();

ratingRouter.post("/", authUser, postProductRating);
ratingRouter.get("/", getProductRating);
export default ratingRouter;
