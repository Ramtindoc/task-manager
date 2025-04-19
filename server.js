const express = require("express");
const conDb = require("./config/db.js");
// const controller = require("./controller/api-controller");

const app = express();
app.use(express.json());

const connection = conDb.pool;

// app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`server runnig in port ${PORT}`);
});
