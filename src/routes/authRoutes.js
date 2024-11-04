// server/routes/authRoutes.js
import express from "express";
import { loginUser, signupUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await signupUser(email, password);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
