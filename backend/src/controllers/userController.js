const bcrypt = require("bcryptjs");

// In-memory "database"
const users = [];

// -------------------
// REGISTER USER
// -------------------
exports.registerUser = async (req, res) => {
  const { name, email, password, dob, gender, grade, phone, guardian, address } = req.body;

  // Validate required fields
  if (!name || !email || !password || !dob || !gender || !grade || !phone || !guardian || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    dob,
    gender,
    grade,
    phone,
    guardian,
    address
  };

  users.push(newUser);

  res.status(201).json({
    message: "User registered successfully",
    user: { id: newUser.id, name, email, dob, gender, grade, phone, guardian, address }
  });
};

// -------------------
// LOGIN USER
// -------------------
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

  // Simple token for demonstration
  const token = `token-${user.id}-${Date.now()}`;

  res.json({
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      dob: user.dob,
      gender: user.gender,
      grade: user.grade,
      phone: user.phone,
      guardian: user.guardian,
      address: user.address
    },
    token
  });
};

// -------------------
// GET ALL USERS
// -------------------
exports.getAllUsers = (req, res) => {
  const safeUsers = users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    dob: u.dob,
    gender: u.gender,
    grade: u.grade,
    phone: u.phone,
    guardian: u.guardian,
    address: u.address
  }));
  res.json(safeUsers);
};

// -------------------
// GET USER BY ID
// -------------------
exports.getUserById = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  const { id, name, email, dob, gender, grade, phone, guardian, address } = user;
  res.json({ id, name, email, dob, gender, grade, phone, guardian, address });
};

// -------------------
// UPDATE USER
// -------------------
exports.updateUser = async (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email, password, dob, gender, grade, phone, guardian, address } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = await bcrypt.hash(password, 10);
  if (dob) user.dob = dob;
  if (gender) user.gender = gender;
  if (grade) user.grade = grade;
  if (phone) user.phone = phone;
  if (guardian) user.guardian = guardian;
  if (address) user.address = address;

  res.json({
    message: "User updated successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      dob: user.dob,
      gender: user.gender,
      grade: user.grade,
      phone: user.phone,
      guardian: user.guardian,
      address: user.address
    }
  });
};

// -------------------
// DELETE USER
// -------------------
exports.deleteUser = (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users.splice(index, 1);
  res.json({ message: "User deleted successfully" });
};