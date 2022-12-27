const User = require("../models/userModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")

// signup
router.post("/signup", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.json({ message: "email is alreday exists, please login your account" })
    } else {
        let saltRound = 10;
        let password = req.body.password;
        let encryptedPassword = await bcrypt.hash(password, saltRound);
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPassword,
            role: req.body.role
        })
        let data = await user.save();
        res.json({ message: "you have register successfully", data })
    }
})

// login
router.post("/login", async (req, res) => {
    let user = await User.findOne({ _id: req.body._id });
    if (!user) {
        return res.json({
            message: "This email is incorrect."
        })
    }
    const SECRETKEY = process.env.SECRET_KEY;
    let comparePassword = await bcrypt.compare(req.body.password, user.password);
    if (comparePassword) {
        const token = jwt.sign({ _id: req.body._id }, SECRETKEY)
        res.json({
            message: "login successfully.",
            token: token
        })
    } else {
        res.json({
            message: "password does not match"
        })
    }
})


// verify
router.get("/verify/user", auth, (req, res) => {

})


router.get("/:id", (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
})


module.exports = router;