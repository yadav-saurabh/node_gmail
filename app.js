const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const port = 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
