const mongoose = require("mongoose");
const userModel = require("./userModel");
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    comments: [
        {
            comment: { type: String, default: "" },
            userId:
                { type: mongoose.Schema.Types.ObjectId, ref: "userModel" }
        }
    ],

})

const blogPost = new mongoose.model("blogPost", blogSchema);
module.exports = blogPost;
