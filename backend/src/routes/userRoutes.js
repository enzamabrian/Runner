const express = require("express");
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/userController");

// CREATE / REGISTER
router.post("/register", registerUser);

// READ
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);

// UPDATE
router.put("/users/:id", updateUser);

// DELETE
router.delete("/users/:id", deleteUser);

module.exports = router;