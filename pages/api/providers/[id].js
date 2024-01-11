import dbConnect from "@/db/connect.js";
import Provider from "@/db/models/Provider.js";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const provider = await Provider.findById(request.query.id);

    if (!provider) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(provider);
  }
}
