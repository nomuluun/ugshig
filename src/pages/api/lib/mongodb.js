import { MongoClient } from "mongodb";

const uri = process.env.DB_HOST;
const options = {};

let client;
let clientPromise;

if (!process.env.DB_HOST) {
  throw new Error("Please add your Mongo URI to .env");
}

if (process.env.NODE_ENV === "development") {
  // Use a global variable in development to prevent multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client every time (or handle pooling separately)
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
