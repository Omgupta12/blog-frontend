const mongoose = require("mongoose");

const DbConnect = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("db connected");
  } catch (e) {
    console.log("error", e.message);
  }
};

module.exports = DbConnect;
