const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const connectToDB = require("./config/database");
require("dotenv").config();

const loginRoutes = require("./routes/loginRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("combined"));

app.use("/api", loginRoutes);

const port = process.env.PORT ;
connectToDB()
  .then(() =>
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    )
  )
  .catch((err) => console.log(err));