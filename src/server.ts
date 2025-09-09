import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import taskRoutes from "./routes/taskRoutes";
import errorHandler from "./middleware/errorHandler";

dotenv.config();
connectDB();

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
