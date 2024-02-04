import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import customerRoutes from "./routes/customerRoutes";
import { connectToDB } from "./config/database";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("combined"));

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use("/api", authRoutes);
app.use("/api", customerRoutes);

const port = process.env.PORT || 8000;

connectToDB()
  .then(() =>
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    )
  )
  .catch((err) => console.log(err));
