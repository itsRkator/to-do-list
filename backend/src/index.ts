import { config } from "dotenv";
import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { rateLimiter } from "./middlewares/rateLimiter";
import taskRoutes from "./routes/taskRouter";
import { connectDatabase } from "./config/dbConfig";

const app = express();
config();
connectDatabase();

app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(morgan("combined"));
app.use(rateLimiter);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "App is running..." });
});

app.use("/api/tasks", taskRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Requested route not found" });
});

app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT ?? 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
