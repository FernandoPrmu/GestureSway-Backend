const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://SachinAbeywickrama:Nathari2002@gesturesway.svoq9wc.mongodb.net/?retryWrites=true&w=majority&appName=GestureSway", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema and model
const UserSchema = new mongoose.Schema({
  username: String, // Changed back to username from name
  email: String,
  password: String,
  age: Number, // Added age field
});

const UserModel = mongoose.model("User", UserSchema);

// Route to handle login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("Login successfully");
        } else {
          res.json("Login failed");
        }
      } else {
        res.json("No records existed");
      }
    })
    .catch((err) => res.status(500).json("Internal server error"));
});

// Route to handle signup
app.post("/register", (req, res) => {
  const { username, email, password, age } = req.body; // Updated field names
  const newUser = new UserModel({ username, email, password, age }); // Updated field names
  newUser
    .save()
    .then(() => res.json("User registered successfully"))
    .catch((err) => res.status(500).json("Internal server error"));
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
