require("dotenv").config();
const express = require("express");
const cors = require("cors");
const adminRoutes = require("./adminRoutes");
const { connectDB } = require("./config/dbConnection");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/backoffice/", adminRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    // console.clear();
    console.log(`server is running`);
  });
});
