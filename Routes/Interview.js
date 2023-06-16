const express = require("express");
const interview = require("../models/Interview");
const Interview = require("../models/Interview");
// const User = require("./users");
const mongoose = require("mongoose");
const db = mongoose.connection;
var nodemailer = require("nodemailer");
const { User } = require("../models/user");
const router = express.Router();

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'youremail@gmail.com',
//     pass: 'yourpassword'
//   }
// });

// var mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };
// @route GET /interview
// @description All interviews
// @acess PUBLIC
router.get("/", async (req, res) => {
  try {
    const Allinterviews = await interview.find();
    return res.json(Allinterviews);
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const data = await interview.findById(req.params.id);
    return res.json(data);
    // console.log(data);
  } catch (error) {
    console.log(error.msg);
  }
});

// @route POST /interview
// @description Add interview
// @acess PUBLIC
router.post("/", async (req, res) => {
  var { title, sDate, eDate, candidate, interviewer } = req.body;
  try {
    // const cid = candidate;
    // const intId = interviewer;
    // const data = await User.findOne({ _id: cid });
    // const cname = data.name;
    // console.log(typeof cname);
    // console.log(data.name);
    // const data2 = await User.findOne({ _id: intId });
    // const iname = data2.name;
    // console.log(data2.name);
    // const jdata=JSON.parse(data);
    // const cname = jdata.name;
    // console.log(cname);
    // const jdata2 = JSON.parse(data2);
    // const iname = jdata2.name;
    // console.log(iname);
    var Cid = candidate;
    var IntId = interviewer;
    const canData = await User.findById(candidate);
    console.log(canData);
    const cname = canData.name;
    console.log(canData.name);
    candidate = canData.name;
    const intData = await User.findById(interviewer);
    console.log(intData);
    const intname = intData.name;
    console.log(intData.name);
    interviewer = intData.name;
    const newInterview = new interview({
      title,
      sDate,
      eDate,
      candidate,
      interviewer,
      Cid,
      IntId,
    });
    console.log(newInterview);
    await newInterview.save();

    return res.json({ msg: "Data Saved succesfully" });
    console.log("Data Saved succesfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
});

// @route PUT /interview
// @description Remove interview
// @acess PUBLIC
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await Interview.deleteOne({ _id: id });
    console.log("hello");
  } catch (error) {
    console.log(error);
  }
});

// @route PUT /interview/edit/:id
// @description Edit interview
// @acess PUBLIC
//  title,
//    sDate,
//    eDate,
//    candidate,
//    interviewer,
router.put("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);
  try {
    await Interview.updateOne(
      { _id: id },
      {
        $set: {
          title: data.title,
          sDate: data.sDate,
          eDate: data.eDate,
          candidate: data.candidate,
          interviewer: data.interviewer,
        },
      }
    );
    return res.status(200).send("Upadted Successfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
