const { default: mongoose } = require("mongoose");
require("./Tour");

const schema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  personalId: {
    type: Number,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // month: {
  //   type: String,
  //   required: true,
  // },
  // vehicule: {
  //   type: String,
  //   required: true,
  // },
  // place: {
  //   type: String,
  //   required: true,
  // },
  // food: {
  //   type: String,
  //   required: true,
  // },
  // payment: {
  //   type: String,
  //   required: true,
  // },
});

const model = mongoose.models.Traveler || mongoose.model("Traveler", schema);
module.exports = model;
