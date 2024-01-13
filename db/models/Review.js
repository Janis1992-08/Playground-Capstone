import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema({
  title: { type: String },
  text: { type: [String] },
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
