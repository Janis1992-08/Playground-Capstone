import mongoose from "mongoose";
const { Schema } = mongoose;

const providerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  skills: { type: String, required: true },
  needs: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const subcategorySchema = new Schema({
  name: { type: String, required: true },
  providers: [providerSchema],
});

const categorySchema = new Schema({
  name: { type: String, required: true },
  subcategories: [subcategorySchema],
});

const Category =
  mongoose.models.Categoty || mongoose.model("Category", categorySchema);

export default Category;
