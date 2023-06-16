const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
router.post("/", async (req, res) => {
  try {
    // const { error } = validate(req.body);
    // if (error)
    //   return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      alert("User already exis");
      return res.status(409).send({ message: "User already exist" });
    }
    const salt = bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    await new User({ ...req.body, password: hashPassword }).save();

    // const { name, email, password } = req.body;
    // const newUser = new User({
    //   name,
    //   email,
    //   password,
    // });

    // await newUser.save();
    console.log(req.body);
    res.status(201).send({ message: "User created successfully." });
    console.log("Registration Successfull");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    return res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server Error" });
  }
});

module.exports = router;
