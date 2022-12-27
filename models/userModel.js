const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("password cannot contain password")
            }
        }

    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default:"user",
        trim: true
    }
}, { timestamps: true });

const users = new mongoose.model("users", userSchema);

module.exports = users;