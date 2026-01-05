import { MongoClient } from "mongodb";

const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb://admin:password123@localhost:27018/todos?authSource=admin";
const DB_NAME = "todos2";
const TODOS_COLLECTION_NAME = "todos";
const USERS_COLLECTION_NAME = "users";

let mongocClient = null;
let mongoConn = null;

export async function initMongoDb() {
  try {
    mongocClient = new MongoClient(MONGO_URL);
    await mongocClient.connect();
    mongoConn = mongocClient.db(DB_NAME);

    const todosCollection = mongoConn.collection(TODOS_COLLECTION_NAME);
    const usersCollection = mongoConn.collection(USERS_COLLECTION_NAME);
    // Create the unique index on title
    await todosCollection.createIndex({ title: 1 }, { unique: true });
    await usersCollection.createIndex({ email: 1 }, { unique: true });

    console.log(
      "Database initialized and unique index created on 'title' field"
    );
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

export async function getDb() {
  if (!mongoConn) {
    if (!mongocClient) {
      mongocClient = new MongoClient(MONGO_URL);
      await mongocClient.connect();
    }
    mongoConn = mongocClient.db(DB_NAME);
  }
  return mongoConn;
}

export async function closeConnection() {
  if (mongocClient) {
    await mongocClient.close();
    mongocClient = null;
    mongoConn = null;
  }
}
