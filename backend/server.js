//using ES6 imports

import mongoose from "mongoose";
import "dotenv/config";
import express from "express";
import cors from "cors";
import BooksRoute from "./Routes/BooksRoute.js";

// Middleware for parsing request body

const app = express();
//parse data to json
app.use(express.json());
app.use(cors());

app.use("/books", BooksRoute);

const port = process.env.PORT;

const uri = process.env.MONGO_URI;
mongoose
    .connect(uri)

    .then(() => {
        console.log(`db connected successfully`);
        app.listen(port, () => {
            console.log(`Server is listening at port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
