import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import customerRoutes from "./routes/customerRoutes";
import sellerRoutes from "./routes/sellerRoutes";
import connectToDB from "./config/database";
import { END_POINT } from "./types/shared.interface";

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

app.use(END_POINT.BASE_URL, authRoutes);
app.use(END_POINT.BASE_URL, customerRoutes);
app.use(END_POINT.BASE_URL, sellerRoutes);

const port = process.env.PORT || 8000;

connectToDB()
  .then(() =>
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    )
  )
  .catch((err) => console.log(err));
