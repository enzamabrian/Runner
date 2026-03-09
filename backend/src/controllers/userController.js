const bcrypt = require("bcryptjs");

// In-memory "database"
const users = [];

// CREATE / REGISTER
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, name, email, password: hashedPassword };
  users.push(newUser);

  return res.status(201).json({ message: "User registered successfully", user: { id: newUser.id, name, email } });
};

// READ ALL USERS
exports.getAllUsers = (req, res) => {
  const safeUsers = users.map(u => ({ id: u.id, name: u.name, email: u.email }));
  res.json(safeUsers);
};

// READ USER BY ID
exports.getUserById = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  const { id, name, email } = user;
  res.json({ id, name, email });
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email, password } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = await bcrypt.hash(password, 10);

  res.json({ message: "User updated successfully", user: { id: user.id, name: user.name, email: user.email } });
};

// DELETE USER
exports.deleteUser = (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users.splice(index, 1);
  res.json({ message: "User deleted successfully" });
};