require("dotenv").config();
const express = require("express");
const cors = require("cors");
const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");
const { connectDB } = require("./config/dbConnection");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/backoffice/", adminRoutes);
app.use("/api/v1/", userRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    // console.clear();
    console.log(`server is running`);
  });
});
