const { default: mongoose } = require("mongoose");
require("./Tour");
require("./Receipt");

const schema = new mongoose.Schema({
  tours: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
  }],
  receipts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Receipt",
  }],
  carts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
  }],
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
  
});

const model = mongoose.models.Traveler || mongoose.model("Traveler", schema);
module.exports = model;
