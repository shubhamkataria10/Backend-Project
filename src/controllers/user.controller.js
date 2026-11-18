
import { User } from "../models/user.model.js";

// REGISTER USER
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required!"
            });
        }

        // Check whether user already exists
        const existing = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }
            ]
        });

        if (existing) {
            return res.status(409).json({
                message: "User already exists!"
            });
        }

        // Create user (password is hashed by the model)
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password
        });

        return res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


// LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Compare password with hashed password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


// LOGOUT USER
const logoutuser = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


// DELETE USER ACCOUNT
const deleteAccount = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const deletedUser = await User.findOneAndDelete({
            email: email.toLowerCase()
        });

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Account deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


export {
    registerUser,
    loginUser,
    logoutuser,
    deleteAccount
};
