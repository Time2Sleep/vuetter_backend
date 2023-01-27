import express from 'express'
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { postValidation } from './validators/Post.js'
import * as PostController from "./controllers/PostController.js";
//models
import PostModel from './models/Post.js'

dotenv.config()
mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.yeryud1.mongodb.net/vuetter?retryWrites=true&w=majority`)
    .then(() => console.log('Mongo is connected'))
    .catch((err) => console.error(err))

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/api/posts', PostController.getAll)
app.post('/api/posts', postValidation, PostController.addPost)
app.delete('/api/posts/:id', PostController.deletePost)
app.patch('/api/posts/:id', PostController.update)

/**
 * App start
 */
app.listen(process.env.PORT, (err) => {
    if(err){
        return console.error(err)
    }
    console.log(`server is running at http://127.0.0.1:${process.env.PORT}/`)
})