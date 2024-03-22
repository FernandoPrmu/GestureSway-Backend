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

// Define schema and model for User
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number,
});

const User = mongoose.model("User", userSchema);

// Define schema and model for GameResult
const gameResultSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    score: Number,
    timestamp: { type: Date, default: Date.now },
});

const GameResult = mongoose.model("GameResult", gameResultSchema);

// Route to handle login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then((user) => {
            if (user) {
                if (user.password === password) {
                    res.json("Login successful");
                } else {
                    res.status(401).json("Login failed");
                }
            } else {
                res.status(404).json("User not found");
            }
        })
        .catch((err) => res.status(500).json("Internal server error"));
});

// Route to handle signup
app.post("/register", (req, res) => {
    const { username, email, password, age } = req.body;
    const newUser = new User({ username, email, password, age });
    newUser
        .save()
        .then(() => res.json("User registered successfully"))
        .catch((err) => res.status(500).json("Internal server error"));
});

// Route to save game results
app.post("/save-results", async (req, res) => {
    try {
        const { userId, score } = req.body;
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
        const userId = req.query.userId;
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