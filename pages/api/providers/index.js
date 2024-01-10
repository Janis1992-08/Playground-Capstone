import dbConnect from "@/db/connect.js";
import Provider from "@/db/models/Provider.js";

export default async function handler(request, response) {
  // goal is to connect to the db
  await dbConnect();

  // check if the request method is GET

  if (request.method === "GET") {
    try {
      const provider = await Provider.find();
      //console.log("provider", provider);
      response.status(200).json(provider);
    } catch (error) {
      console.error("Error fetching provider:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (request.method === "POST") {
    try {
      const providerData = request.body;
      await Provider.create(providerData);

      response.status(201).json({ status: "Provider created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
