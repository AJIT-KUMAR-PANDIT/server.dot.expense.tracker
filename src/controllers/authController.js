// server/controllers/authController.js
import { getCollection } from "../config/db.js";
import { DocumentExistsError } from "couchbase";

export const loginUser = async (email, password) => {
  const cluster = getCollection();
  try {
    const query = `SELECT * FROM \`user_auth\` WHERE email = $1 AND password = $2`;
    const result = await cluster.query(query, {
      parameters: [email, password],
    });

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signupUser = async (email, password) => {
  const collection = getCollection();
  const userId = `user::${email}`;
  const userDoc = { email, password, type: "user" };

  try {
    await collection.insert(userId, userDoc);
    return { email };
  } catch (error) {
    if (error instanceof DocumentExistsError) {
      throw new Error("User already exists");
    } else {
      throw new Error(error.message);
    }
  }
};
