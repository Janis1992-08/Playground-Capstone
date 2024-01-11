import dbConnect from "@/db/connect.js";
import Provider from "@/db/models/Provider.js";

export default async function handler(request, response) {
  const { id } = request.query;
  // goal is to connect to the db
  await dbConnect();

  // check if the request method is GET

  if (request.method === "GET") {
    try {
      const providers = await Provider.findById(id).populate("reviews");
      console.log("products", providers);
      response.status(200).json(providers);
    } catch (error) {
      console.error("Error fetching providers:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (request.method === "PUT") {
    const updatedProvider = request.body;
    await Provider.findByIdAndUpdate(id, updatedProvider);

    // Find the joke by its ID and update the content that is part of the request body!
    response.status(200).json({ status: `Provider successfully updated.` });
    // If successful, you'll receive an OK status code.
  }

  if (request.method === "DELETE") {
    await Provider.findByIdAndDelete(id);
    // Declare jokeToDelete to be the joke identified by its id and delete it.
    // This line handles the entire deletion process.
    response
      .status(200)
      .json({ status: `Provider ${id} successfully deleted.` });
  }
}
