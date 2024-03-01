// Import the bcryptjs library for hashing passwords
const bcrypt = require("bcryptjs");

// Define an array of user objects with their details
const users = [
  {
    // Admin user details
    name: "Admin", // User's name
    email: "admin@node.com", // User's email
    // Hash the password "123456" with a salt of 10 rounds for security
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true, // Boolean indicating if the user is an admin
  },

  {
    // Regular user details
    name: "User", // User's name
    email: "user@node.com", // User's email
    // Hash the password "123456" with a salt of 10 rounds
    password: bcrypt.hashSync("123456", 10),
    // No isAdmin property means this user is not an admin
  },
];

// Export the users array for use in other parts of the application
module.exports = users;
