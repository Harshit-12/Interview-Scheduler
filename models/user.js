const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passwordComplexity = require("joi-password-complexity");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  interviewList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "interview",
    },
  ],
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY, {
    expiresIn: "7d",
  });
  return token;
};

// jwt.sign(
//   payload,
//   config.get("jwtSecret"),
//   { expiresIn: 360000 },
//   (err, token) => {
//     if (err) throw err;
//     res.json({ token });
//   }
// );

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hash(this.password, 10);
  }
  next();
});

// const validate = (data) => {
//   const schema = joi.object({
//     name: joi.string().required().label("name"),
//     email: joi.string().required().label("email"),
//     password: passwordComplexity.required().label("password"),
//   });
//   return schema.validate(data);
// };

const User = mongoose.model("user", userSchema);
module.exports = { User };
