import express from "express";
import bcrypt from "bcrypt";
import db from "../db/client.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const result = await db.query("SELECT * FROM users WHERE name = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { password: _, ...safeUser } = user;

    res.json({ message: "Login successful", user: safeUser });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
