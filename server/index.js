const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { connection } = require('./db/connection')
const authRoutes = require("./routes/auth.routes")
const postRoutes = require("./routes/posts.routes")
const userRoutes = require("./routes/users.routes")
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.get("/api", (req, res) => { res.send("<h1>Welcome to server...</h1>"); });
app.use('*', (req, res) => { res.json({ message: "undefined route" }) })

app.listen(5000, () => {
    connection.then(() => console.log("Database is connected")).catch((error) => console.error('Error connecting to MongoDB:', error));
    console.log("server is running on port " + PORT);
})