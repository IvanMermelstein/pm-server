import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";

/* CONFIG */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

/* APP ROUTES */
app.get("/", (req, res) => {
  res.send("This is the home route");
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

/* SERVER */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});