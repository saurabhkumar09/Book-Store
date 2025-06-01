import express from 'express';
import { PORT, mongoDB_URL } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors'
import booksRoute from './Routes/booksRoute.js';
const app = express();
mongoose
    .connect(mongoDB_URL)
    .then(() => {
        console.log("App connected successfuly")
    })
    .catch((err) => {
        console.log(`App is not connected ${err}`)
    })

app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin:"",
//     methods:['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders:['Content-Type']
// }))
app.use('/books',booksRoute);


app.listen(PORT, () => {
    console.log(`App is listening in ${PORT}`)
});