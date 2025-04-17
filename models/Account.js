const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  matchScore: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Target", "Not Target"],
    default: "Not Target",
  },
});

module.exports = mongoose.model("Account", AccountSchema);
