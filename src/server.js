import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, closeDB } from "./db/client.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import todosRouter from "./routes/todos.js";
import editRouter from "./routes/edit.js";
import deleteRouter from "./routes/delete.js";
import addRouter from "./routes/add.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/todos", todosRouter);
app.use("/edit", editRouter);
app.use("/delete", deleteRouter);
app.use("/add", addRouter);

app.get("/", (req, res) => {
  res.json({ message: "Workflow API Ready! Use /login or /register" });
});

process.on("SIGTERM", async () => {
  await closeDB();
  process.exit(0);
});

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    process.exit(1);
  }
};

start();
