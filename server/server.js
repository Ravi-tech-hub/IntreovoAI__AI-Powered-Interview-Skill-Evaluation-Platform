const { connect } = require("mongoose");
const app = require("./app");
require("dotenv").config();
const connectDB = require("./src/config/db");

connectDB();

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("Serever is running on port", PORT);
});
