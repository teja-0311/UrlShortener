const dbgr = require("debug")("app:routes:userRoutes");
const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

const userModel = require("../models/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // Hash password
        const hash = await bcrypt.hash(password, 10);

        // Create user
        const createdUser = await userModel.create({
            name,
            email,
            password: hash
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email
            }
        });

    } catch (err) {
        dbgr(err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false 
        });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        dbgr(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Logout successful"
    });
});

module.exports = router;