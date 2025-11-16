import express from "express";
import db from "../db/client.js";
const router = express.Router();

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, category, status, priority, due_date } =
      req.body;

    if (!id) {
      return res.status(400).json({ error: "Id is required" });
    }

    const updateTodo = await db.query(
      "UPDATE todos SET title = $1, description = $2, status = $3, priority = $4, category = $5, due_date = $6 WHERE id = $7 RETURNING *",
      [title, description, status, priority, category, due_date, id]
    );

    if (updateTodo.rows.length === 0) {
      return res.status(404).json({ error: "Update not successful" });
    }

    const updatedTodo = updateTodo.rows.at(0);
    res.json({ message: "Update successful", data: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
