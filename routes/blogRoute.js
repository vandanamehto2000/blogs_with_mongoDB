const Blog = require("../models/blogModel");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// post by admin/user
router.post("/blogPost", async (req, res) => {
    try {
        let body = req.body;
        const blog = new Blog({
            title: body.title,
            description: body.description
        })
        let data = await blog.save();
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }
})


// delete post by id admin/user
router.delete("/deletePost/:id", async (req, res) => {
    try {
        let data = await Blog.findByIdAndRemove(req.params.id)
        res.json({ message: "deleted successfully", data })
    }
    catch (err) {
        res.send(err)
    }
})


// update post by id admin/user
router.put("/updatePost/:id", async (req, res) => {
    try {
        let data = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json({ message: "deleted successfully", data })
    }
    catch (err) {
        res.send(err)
    }
})

// read post by admin/user
router.get("/readPost", async (req, res) => {
    try {
        let data = await Blog.find()
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }
})


// comment on blogs by users
router.post("/commentOnPost/:id", (req, res) => {
    try {
        const { comment, userId } = req.body

        let data = { "comment": comment, "userId": userId }
        console.log(data);

        Blog.findByIdAndUpdate({ _id: req.params.id }, { $push: { 'comments': data } }, (err, result) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(result)
            }
        })
    }
    catch (err) {
        res.send(err);
    }

})

// // read all comments  with username
router.get("/all/comment", (req, res) => {
    Blog.find()
        .populate({ path: "comments.userId", select: 'userName' })
        .then((data) => {
            res.send
        })
        .catch((err) => {
            res.send(err)
        })
})


module.exports = router;