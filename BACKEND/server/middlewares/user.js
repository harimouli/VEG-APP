

const jwt = require("jsonwebtoken");
const {JWT_USER_SECRET} = require("../config");

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        res.status(401).send({
            message: "Unauthorized"
        });
        return;
    }
    const jwtToken = authHeader.split(' ')[1];
    try {
        const decodedData = jwt.verify(jwtToken, JWT_USER_SECRET);
        req.user = decodedData;
        next();

    }catch(err) {
        res.status(403).send({
            message: "you are not authorized!"
        })
    }
}



module.exports = {
    authenticateUser
}