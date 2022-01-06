// external imports
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// internal imports
import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// greeting route
app.get('/', (req, res) => {
  res.send("Hello to memories api");
})

// routing setup
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;

// database connection
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));
