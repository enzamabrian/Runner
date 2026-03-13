const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/userController");

// -------------------
// AUTH
// -------------------
router.post("/register", registerUser); // Register a new student
router.post("/login", loginUser);       // Login student

// -------------------
// CRUD
// -------------------
router.get("/users", getAllUsers);       // Get all users
router.get("/users/:id", getUserById);   // Get user by ID
router.put("/users/:id", updateUser);    // Update user
router.delete("/users/:id", deleteUser); // Delete user

module.exports = router;