const errorHandler = (err, req, res, next) => {
    if (err.name === 'CastError'){
        return res.status(400).send({ error: 'id:tä ei löydy'})
    } else  if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token'
        })
    } else if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'token expired'
        })
    }
    next(err)
}

module.exports = {
    errorHandler
}