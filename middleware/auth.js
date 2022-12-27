const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const SECRETKEY = process.env.SECRET_KEY;
    //     try {
    //         let token = req.headers.authorization;
    //         if (token) {
    //             token = token.split(" ")[1];
    //             let user = jwt.verify(token, SECRETKEY);
    //             res.send(user)
    //             req.userId = user._id
    //         }
    //         else {
    //             res.status(401).json({ message: "unauthorized user" })
    //         }
    //         next();
    //     }
    //     catch (error) {
    // console.log(error);
    // res.status(401).json({ message: "unauthorized user" })
    //     }
    // }


    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer") || !req.headers.authorization.split(' ')[1]) {
            return res.json({
                message: "please provide the token"
            })
        }
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRETKEY);
        res.send(decoded)
        console.log(req.userId = decoded._id);

        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "unauthorized user" })
    }
}


module.exports = auth;

