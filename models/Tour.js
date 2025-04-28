const { default: mongoose } = require("mongoose");
require('./Traveler')
const schema = new mongoose.Schema({
  travelers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Traveler",
  }],
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});



const model = mongoose.models.Tour || mongoose.model("Tour", schema);

module.exports = model;
