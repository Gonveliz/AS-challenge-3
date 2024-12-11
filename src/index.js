const mongoose = require('mongoose');

const db = process.env.TO_DO_DB;

const connectDB = async () => {
  if (!db) {
    console.log('Aplicacion desplegada en EKS version:1');
    return;
  }

  let attempts = 10;
  while (attempts) {
    try {
      await mongoose.connect(db);
      console.log('MongoDB connected...');
      break;
    } catch (err) {
      console.log("Error: ", err.message);
      attempts -= 1;
      console.log(`connection attempts left: ${attempts}`);
      await new Promise(res => setTimeout(res, 10000)); // wait for 10 seconds before retrying
    }
  }
};

module.exports = { connectDB };
