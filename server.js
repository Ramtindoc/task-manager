const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.use("/api/tasks", require("./routes/tasks"));

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`server runnig in port ${PORT}`);
});
