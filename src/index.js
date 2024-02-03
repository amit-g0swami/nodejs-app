const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const connectToDB = require("./config/database");
const authMiddleware = require("./middleware/authMiddleware");
require("dotenv").config();

const loginRoutes = require("./routes/loginRoutes");
const addressRoutes = require("./routes/addressRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("combined"));
app.use(authMiddleware);

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use("/api", loginRoutes);
app.use("/api", addressRoutes);

const port = process.env.PORT;

connectToDB()
  .then(() =>
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    )
  )
  .catch((err) => console.log(err));
