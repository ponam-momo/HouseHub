const express = require("express");
require('dotenv').config();
const authRoutes = require("./Member 1/auth");
const profileRoutes = require("./Member 1/profile");
const listingRoutes = require("./Member 2/listingRoutes");
const adminRoutes = require("./Admin/adminRoutes");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Welcome to HouseHub!");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", profileRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});