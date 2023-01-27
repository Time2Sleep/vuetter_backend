import {validationResult} from "express-validator";
import PostModel from "../models/Post.js";

//27.01.2023 20:58 likes

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find()
        return res.json(posts)
    } catch (error) {
        console.error('Error: ',error)
        res.status(500).json({
            message: 'Не удалось получить сообщения'
        })
    }
}

export const addPost = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors.array())

        //Вместо авторизации простые куки сессии
        const session = req.cookies.session || Date.now()

        const {name, comment} = req.body
        const model = new PostModel({
            name,
            comment,
            author: session,
            date: new Date(Date.now())
        })
        const post = await model.save()

        if(!req.cookies.session) res.cookie('session', Date.now())
        res.cookie('session', session).json({status: 'ok', result: post})
    } catch(error){
        console.error('Error: ',error)
        res.status(500).json({
            message: 'Не удалось создать сообщение'
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await PostModel.findOneAndDelete({
            _id: postId,
            author: req.cookies.session
        })
        if(!post) return res.json({message: 'Не удалось удалить сообщение'})
        res.json({message: 'Success'})
    } catch (error) {
        console.error('Error: ',error)
        res.status(500).json({
            message: 'Не удалось удалить сообщение'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id
        const { comment } = req.body
        const post = await PostModel.findOneAndUpdate({
            _id: postId,
            author: req.cookies.session
        }, {
            comment
        })
        if(!post) return res.json({message: 'Не удалось изменить сообщение'})
        return res.json({message: 'Success'})
    } catch (error) {
        console.error('Error: ',error)
        res.status(500).json({
            message: 'Не удалось изменить сообщение'
        })
    }
}