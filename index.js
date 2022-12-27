const express = require("express");
const app = express();
const db = require("./config/dbConfig");
const blogRoute = require("./routes/blogRoute");
const userRoute = require("./routes/userRoute");
const dotenv = require("dotenv").config();

app.use(express.json());

app.use((req, res, next) => {
    console.log("HTTP Method - " + req.method + " , URL - " + req.url);
    next();
});

app.use(express.urlencoded({extended:true}));

app.use("/api/v1", blogRoute);
app.use("/api/v1", userRoute);


// const PORT = process.env.port || 8000
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("server is running on port=",PORT);
})

db()