const express = require("express");
require('dotenv').config();
const authRoutes = require("./Member 1/auth");
const profileRoutes = require("./Member 1/profile");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Welcome to HouseHub!");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", profileRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
