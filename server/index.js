const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

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

// Session middleware
app.use(session({
    secret: 'secret_key', // Change this to a random string
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }
}));

// Define schema and model for User
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number,
});

const UserModel = mongoose.model("User", UserSchema);

// Route to handle login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            if (user.password === password) {
                req.session.userId = user._id; // Store user ID in session
                res.json("Login successful");
            } else {
                res.status(401).json("Login failed");
            }
        } else {
            res.status(404).json("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal server error");
    }
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

// Route to save game results
app.post("/save-results", async (req, res) => {
    try {
        const userId = req.session.userId; // Retrieve user ID from session
        const { score } = req.body;
        const gameResult = new GameResult({ userId, score });
        await gameResult.save();
        res.status(201).json("Game results saved successfully");
    } catch (error) {
        console.error("Error saving game results:", error);
        res.status(500).json("Internal server error");
    }
});

// Route to retrieve game results
app.get("/game-results", async (req, res) => {
    try {
        const userId = req.session.userId; // Retrieve user ID from session
        const gameResults = await GameResult.find({ userId });
        res.status(200).json(gameResults);
    } catch (error) {
        console.error("Error retrieving game results:", error);
        res.status(500).json("Internal server error");
    }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
