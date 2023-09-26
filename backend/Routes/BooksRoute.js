


import express from "express";

const router = express.Router();

import { Book } from "../models/BookModel.js";


//Post or Create a new book

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
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

router.put('/:id', async (req, res) => {
  try {
    const { title, author, publishYear } = req.body
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "all required fields , title , author and publishYear",
      });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "book not found" });
    }

    return res.status(200).send({ message: " book updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//delete one book

router.delete("/:id", async (req, res) => {
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
router.get("/", (req, res) => {
  res.status(200).json({
    msg: "Success",
  });
});


export default router;