import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://himanshu8747:Duopass@8747@duopass.vfky3.mongodb.net/?retryWrites=true&w=majority&appName=Duopass";

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const client = new MongoClient(uri);

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client.db();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Could not connect to the database");
  }
}


