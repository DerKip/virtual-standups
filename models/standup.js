const mongoose = require("mongoose");

const requiredStringValidator = [
  val => {
    let testVal = val.trim();
    return testVal.length > 0;
  },
  // custom error message
  "{PATH} can't be empty"
];

const standupSchema = new mongoose.Schema({
  teamMemberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teamMembers"
  },
  teamMember: {
    type: String,
    required: true,
    validate: requiredStringValidator
  },
  project: {
    type: String,
    required: true,
    validate: requiredStringValidator
  },
  workYesterday: {
    type: String,
    required: true,
    validate: requiredStringValidator
  },
  workToday: {
    type: String,
    required: true,
    validate: requiredStringValidator
  },
  impediment: {
    type: String,
    required: true,
    default: "None",
    validate: requiredStringValidator
  },
  createdOn: { type: Date, default: Date.now }
});
standupSchema.path("project").required(true, "Oops! Suply a project title");

module.exports = mongoose.model("Standup", standupSchema);
