const errorHandler = (err, req, res, next) => {
	if (err.name === 'CastError'){
		return res.status(400).send({ error: 'id:tä ei löydy'})
	}
	next(err)
}

module.exports = {
	errorHandler
}