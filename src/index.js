const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const connectToDB = require("./config/database");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");

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

const port = process.env.PORT;

connectToDB()
  .then(() =>
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    )
  )
  .catch((err) => console.log(err));
