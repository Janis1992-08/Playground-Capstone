import dbConnect from "@/db/connect.js";
import Category from "@/db/models/Category.js";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const category = await Category.findById(id);

    if (!category) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(category);
  }
}
