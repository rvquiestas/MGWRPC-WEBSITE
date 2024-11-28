import express from "express";
import { postProductRating } from "../controllers/ratingController.js";

const ratingRouter = express.Router();

ratingRouter.post("/rate", postProductRating);
export default ratingRouter;
