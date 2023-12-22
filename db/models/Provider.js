import mongoose from "mongoose";

const { Schema } = mongoose;

const providerSchema = new Schema({
  _id: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  skills: { type: String, required: true },
  needs: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subcategoryId: { type: String, ref: "Subcategory", required: true },
});

const Provider =
  mongoose.models.Provider || mongoose.model("Provider", providerSchema);
export default Provider;
