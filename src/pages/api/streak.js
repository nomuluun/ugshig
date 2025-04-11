// pages/api/streak.js
import { ObjectId } from "mongodb";
import clientPromise from "./lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("ugshig");
    const collection = db.collection("users");

    if (req.method === "PUT") {
      const { _id, streak } = req.body;
      if (!_id)
        return res.status(400).json({ error: "User ID (_id) is required" });

      const updated = await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { streak } }
      );

      if (updated.modifiedCount === 1) {
        res.status(200).json({ message: "User updated successfully" });
      } else {
        res.status(404).json({ error: "User not found or data unchanged" });
      }
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("MongoDB error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}
