const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  sDate: {
    type: String,
    required: true,
  },
  eDate: {
    type: String,
    required: true,
  },
  candidate: {
    type: String,
    required: true,
  },
  interviewer: {
    type: String,
    required: true,
  },
  Cid: {
    type: mongoose.Schema.Types.ObjectId,   
    ref: "user",
  },
  IntId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = Interview = mongoose.model("interview", InterviewSchema);
