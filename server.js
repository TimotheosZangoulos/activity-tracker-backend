const express = require("express");
const cors = require("cors"); 
const apiRouter = require("./src/routes/index");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:4200" }));

app.use("/api", apiRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
