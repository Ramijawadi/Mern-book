//using ES6 imports
// require('dotenv').config()
// const express = require('express')
// const mongoose = require('mongoose')
import { Book } from "./models/bookModel.js";
import mongoose from "mongoose";
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
//parse data to json
app.use(express.json());
// app.use(cors());

//route post or create a new book

app.post("/book", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "all required fields , title , author and publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// get all books

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// get one book by id

app.get("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// update one book

app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "all required fields , title , author and publishYear",
      });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "book not found" });
    }

    return res.status(500).send({ message: " book updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//delete one book

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "book not found" });
    }
    return res.status(200).send({ message: " book  deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Start the server

// Define a route that responds to GET requests
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Success",
  });
});

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
