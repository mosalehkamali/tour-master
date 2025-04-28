const { default: mongoose } = require("mongoose");
require("./Tour");
require("./Traveler");

const schema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tuor",
    required: true,
  },
  traveler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Traveler",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "paid",
  },
  decription: {
    type: String,
    required: false,
  },
});

const model = mongoose.models.Receipt || mongoose.model("Receipt", schema);
module.exports = model;
