const express = require("express");
const conDb = require("./config/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());

// connect to db
const connection = conDb.pool;

app.use("/", require("./routes/auth.js"));

app.use("/", require("./routes/tasks"));

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`server runnig in port ${PORT}`);
});

module.exports = {
  authenticateToken,
  router,
};
