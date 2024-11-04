// server/config/db.js
import couchbase from "couchbase";
import dotenv from "dotenv";

dotenv.config();

let cluster;

export const initializeCluster = async () => {
  try {
    cluster = await couchbase.connect(process.env.COUCHBASE_URI, {
      username: process.env.COUCHBASE_USERNAME,
      password: process.env.COUCHBASE_PASSWORD,
    });
    console.log("Couchbase cluster initialized");
  } catch (error) {
    console.error("Failed to initialize Couchbase cluster:", error);
    throw error;
  }
};

export const getCollection = () => {
  if (!cluster) throw new Error("Couchbase cluster not initialized");
  const bucket = cluster.bucket(process.env.COUCHBASE_BUCKET || "default"); // Use default if env variable is missing
  return bucket.defaultCollection();
};
