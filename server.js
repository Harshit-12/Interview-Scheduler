const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./connectDB");
const path = require("path");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/users");
const authRoutes = require("./Routes/auth");
const logoutRouter = require("./Routes/Logout");
dotenv.config();

connectDB();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/logout", logoutRouter);
app.use("/interview", require("./Routes/Interview"));
app.listen(5000, () => {
  console.log("Server is Running");
});
