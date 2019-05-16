const mongoose = require("mongoose");

const sizeValidation = [
  val => {
    let testVal = val.trim();
    return testVal.length > 0 && testVal.length <= 50;
  },
  "{PATH} character length should not be less than 0 or greater that 50"
];

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true, validate: sizeValidation }
});

module.exports = mongoose.model("TeamMember", teamMemberSchema);
