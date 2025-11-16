import express from "express";
import db from "../db/client.js";
const router = express.Router();

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      status,
      priority,
      category,
      due_date,
      created_at,
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Id is required" });
    }

    const newTodo = await db.query(
      "INSERT INTO todos (title, description, status, priority, category, due_date, created_at, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [title, description, status, priority, category, due_date, created_at, id]
    );

    if (newTodo.rows.length === 0) {
      return res.status(404).json({ error: "Todo not added successfully" });
    }

    const addedTodo = newTodo.rows.at(0);
    res.json({ message: "Update successful", data: addedTodo });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
