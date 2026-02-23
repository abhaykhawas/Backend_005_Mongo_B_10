
const teacherMiddleware = async (req, res, next) => {
    try{
        if(req.user.type !== "teacher") return res.status(403).json({message: "Forbidden content"});

        next()
    }
    catch(err) {
        res.status(403).json({ message: "Invalid Role" })

    }
}

module.exports = teacherMiddleware;