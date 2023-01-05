const express = require("express");
const cors = require("cors");
const route = require("./routes");

const app = express();

const PORT = 8000;

app.use(express.json());
app.use(cors());
app.use("/", route);

app.listen(PORT, () => {
  console.clear();
  console.log(`server is running`);
});
