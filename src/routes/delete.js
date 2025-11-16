import express from "express";
import db from "../db/client.js";

const router = express.Router();

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Id is required" });
  }

  try {
    const deleteTodo = await db.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );

    if (deleteTodo.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
