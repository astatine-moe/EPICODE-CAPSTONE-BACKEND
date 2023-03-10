import http from "http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import hat from "hat";
import morgan from "morgan";

dotenv.config();

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//Mongoose
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");

    server.listen(port, () => {
        console.log(`Server running on http://127.0.0.1:${port}`);
    });
});
