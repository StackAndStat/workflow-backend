import express from "express";
import db from "../db/client.js";
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const userId = parseInt(id);
    if (isNaN(userId) || userId <= 0) {
      return res
        .status(400)
        .json({ error: "User Id must be a positive integer" });
    }

    const todo = await db.query("SELECT * FROM todos WHERE user_id = $1", [
      userId,
    ]);

    if (todo.rows.length === 0) {
      return res.status(200).json({
        message: "No tasks found for this user",
        data: [],
      });
    }

    const todos = todo.rows;

    res.json({ message: "success", data: todos });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An internal server error occurred. Please try again later",
      });
  }
});

export default router;
