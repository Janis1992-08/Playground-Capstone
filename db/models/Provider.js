import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const providerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  skills: { type: String, required: true },
  needs: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const Provider =
  mongoose.models.Provider || mongoose.model("Provider", providerSchema);

export default Provider;
