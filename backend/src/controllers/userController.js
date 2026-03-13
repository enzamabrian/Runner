const bcrypt = require("bcryptjs");
const pool = require("../config/db");

// -------------------
// REGISTER USER
// -------------------
exports.registerUser = async (req, res) => {
  const { name, email, password, dob, gender, grade, phone, guardian, address } = req.body;

  if (!name || !email || !password || !dob || !gender || !grade || !phone || !guardian || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email exists
    const [existing] = await pool.query("SELECT id FROM students WHERE email = ?", [email]);
    if (existing.length) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO students (name, email, password, dob, gender, grade, phone, guardian, address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, dob, gender, grade, phone, guardian, address]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: { id: result.insertId, name, email, dob, gender, grade, phone, guardian, address }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

// -------------------
// LOGIN USER
// -------------------
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  try {
    const [rows] = await pool.query("SELECT * FROM students WHERE email = ?", [email]);
    if (!rows.length) return res.status(400).json({ message: "Invalid email or password" });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = `token-${user.id}-${Date.now()}`; // Replace with JWT in production

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

// -------------------
// GET ALL USERS
// -------------------
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name, email, dob, gender, grade, phone, guardian, address FROM students");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

// -------------------
// GET USER BY ID
// -------------------
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, dob, gender, grade, phone, guardian, address FROM students WHERE id = ?",
      [id]
    );
    if (!rows.length) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

// -------------------
// UPDATE USER
// -------------------
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, dob, gender, grade, phone, guardian, address } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM students WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ message: "User not found" });

    let hashedPassword = rows[0].password;
    if (password) hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `UPDATE students
       SET name = ?, email = ?, password = ?, dob = ?, gender = ?, grade = ?, phone = ?, guardian = ?, address = ?
       WHERE id = ?`,
      [name || rows[0].name, email || rows[0].email, hashedPassword, dob || rows[0].dob,
       gender || rows[0].gender, grade || rows[0].grade, phone || rows[0].phone,
       guardian || rows[0].guardian, address || rows[0].address, id]
    );

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

// -------------------
// DELETE USER
// -------------------
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM students WHERE id = ?", [id]);
    if (!result.affectedRows) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};