// Import mongoose for database modeling and bcryptjs for password hashing
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the user schema with fields and properties
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // User's name, required
    email: { type: String, required: true, unique: true }, // User's email, required and must be unique
    password: { type: String, required: true }, // User's password, required
    isAdmin: {
      type: Boolean, // Boolean to indicate if the user is an admin
      default: false, // Default value is false (non-admin)
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Method to validate if the entered password matches the stored hashed password
userSchema.methods.matchPassword = async function (enterPassword) {
  // Compares the entered password with the hashed password in the database
  return await bcrypt.compare(enterPassword, this.password);
};

// Middleware to hash the password before saving the user document
userSchema.pre("save", async function (next) {
  // If the password field has not been modified, move to the next middleware
  if (!this.isModified("password")) {
    next();
  }
  // Generate a salt with 10 rounds
  const salt = await bcrypt.genSalt(10);
  // Hash the password and store it
  this.password = await bcrypt.hash(this.password, salt);
});

// Export the User model based on the user schema
module.exports = mongoose.model("User", userSchema);
