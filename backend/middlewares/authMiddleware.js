const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    console.log("Inside the middleware");
    let token = req.headers.authorization
    if(!token) return res.status(401).json({ error : "Token not found"})
    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if(err) return res.status(500).json({ err : err.message })
        req.user = payload
        console.log(req.user);
    })
    next()
}

const verifyAdmin = (req, res, next) => {
     if (req.user.role !== 'admin') {
        return res.status(403).json({error : "You are not an Admin"})
     } else if (req.user.role == 'admin') {
       next() 
     }
}

module.exports = { verifyUser, verifyAdmin }
