const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/login", require("./routes/auth"));
app.use("/accounts", require("./routes/accounts"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
