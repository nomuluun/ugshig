import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.DB_HOST;

export default async function handler(req, res) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("ugshig");
    const collection = db.collection("users");

    if (req.method === "GET") {
      const data = await collection.find({}).toArray();
      res.status(200).json(data);
    } else if (req.method === "POST") {
      const { username, password } = req.body;

      // Шалгах
      const result = await collection.findOne({ username, password });

      if (result) {
        res.status(200).json({ message: "User authenticated", user: result });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } else if (req.method === "PUT") {
      const { _id, score, task } = req.body;
      console.log("req=", req.body);
      if (!_id) {
        return res.status(400).json({ error: "User ID (_id) is required" });
      }

      const updated = await collection.updateOne(
        { _id: new ObjectId(_id) },
        {
          $set: {
            score: score,
            task: task,
          },
        }
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
    console.error("MongoDB connection error:", error.message);
    res.status(500).json({
      error: "Failed to connect to MongoDB",
      message: error.message,
    });
  } finally {
    await client.close();
  }
}
