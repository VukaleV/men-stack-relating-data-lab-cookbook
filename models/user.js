const mongoose = require('mongoose');

// Food schema
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  pantry: [foodSchema] // ovde dodajemo pantry kao niz foodSchema
});

const User = mongoose.model("User", userSchema);

module.exports = User;
