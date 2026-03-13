require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);

// Test route
app.get("/api/hello", (req, res) => res.json({ message: "Hello from backend" }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});