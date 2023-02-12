require("dotenv").config()
const port = process.env.PORT||8080
const express = require("express");
const DbConnect = require("./config/db");
const app = express();
const BlogRoute = require("./routes/blog.routes");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.get("/", (req, res) => res.send("server working"));
app.use("/blog", BlogRoute);

app.listen(port, async () => {
  await DbConnect();
  console.log(`server started on port ${port}`);
});
