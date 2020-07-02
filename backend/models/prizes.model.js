const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const prizeSchema = new Schema(
  {
    title: { type: String, required: false },
    description: { type: String, required: false },
    point_value: { type: Number, required: false },
    counter: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

const prize = mongoose.model("prize", prizeSchema);

module.exports = prize;
