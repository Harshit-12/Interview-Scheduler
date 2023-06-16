// const mongoose = require("mongoose");
// mongoose.set('strictQuery', false);
// const dotenv = require("dotenv");
// dotenv.config();
// const db = process.env.MONGO_URI;
// const connectDB = async () => {
//     try {
//         await mongoose.connect(db);
//         console.log("Database connected...");
//     } catch (error) {
//         console.log(error);
//     }
// };
// module.exports = connectDB;

const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
      await mongoose.connect("mongodb+srv://user:pass@cluster0.2u6ywaf.mongodb.net/?retryWrites=true&w=majority",
          {
            useUnifiedTopology: true,
            useNewUrlParser: true
          });
      
    console.log("DB connected...");
  } catch (err) {
    console.error(err.message);
    console.log("1111");
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;