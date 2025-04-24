const { default: mongoose } = require("mongoose");
require('./Traveler')
const schema = new mongoose.Schema({
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

schema.virtual("travelers",{
    ref:"Traveler",
    localField:"_id",
    foreignField:"tour"
})

const model = mongoose.models.Tour || mongoose.model("Tour", schema);

module.exports = model;
