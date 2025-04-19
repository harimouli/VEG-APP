

const authenticateAdmin = (req, res, next) => {
    const isAdmin = req.user.isAdmin;
    if(isAdmin) {
        next();
    }
    else{
        res.send({
            message: "You are not Admin"
        })
    }

}


module.exports = {
    authenticateAdmin
}