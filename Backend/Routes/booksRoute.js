import express, { Router } from 'express';
const router = Router();
import  { Book } from '../models/bookModel.js';

//Route to add a new book
router.post('/add', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publisher
        ) {
            return res.status(400).send({
                message: 'Send all required firelds, title, author, publisher',
            });
        }
        const newBook = await Book.create({
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
        })
        return (res.status(201).send({message:"Book added"}))

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message });
    }
});

//Route to get all Books in the DB
router.get('/getBooks', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(201).send({
            count: books.length,
            data: books
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

//Route to get Book by it's ID
router.get('/getbooks/:id', async (req, res) => {
    try {
      const { id } = req.params; // extract id from the route params
      const book = await Book.findById(id); // Find the book by ID
  
      if (!book) { // if no book is found, return a 404 response
        return res.status(404).send({ message: 'Book not found' });
      }
  
      res.status(200).send({
        data: book
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: 'Server error' });
    }
  });

//Route to update the Book by ID
router.put('/update/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publisher
        ) {
            return res.status(400).send({
                message: 'Send all required firelds, title, author, publisher',
            });
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' })
        }
        return res.status(200).send({ message: 'Book is updated successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});
//Route to delete the Book by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' })
        }
        return res.status(201).send({ message: 'Book is deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });

    }
});
export default router
