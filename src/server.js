require("dotenv").config();
const express = require("express");
const cors = require("cors");
const route = require("./routes");
const { connectDB } = require("./config/dbConnection");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", route);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    // console.clear();
    console.log(`server is running`);
  });
});
