const mongoose = require("mongoose");
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
const dbConnect = () => {
  try {
    const conn = mongoose.connect(DB);
    console.log("DB connection successful!");
  } catch (error) {
    console.log(error);
  }
};
module.exports = dbConnect;
