
import mongoose from "mongoose";
import { Post } from "../models/post.model.js";

// CREATE a post
const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        if (!name || !description || age === undefined || age === null) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const post = await Post.create({
            name,
            description,
            age
        });

        return res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// READ all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        return res.status(200).json({
            message: "Posts fetched successfully",
            posts
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// UPDATE a post
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid post ID"
            });
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No data provided for update"
            });
        }

        const post = await Post.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.status(200).json({
            message: "Post updated successfully",
            post
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// DELETE a post
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid post ID"
            });
        }

        const deleted = await Post.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export {
    createPost,
    getPosts,
    updatePost,
    deletePost
};
