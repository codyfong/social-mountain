require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env //get secret from .env

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

        if (!headerToken) { //Checks if header token exists
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET)//checks request info, if valid the return is the decoded data
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!token) {
            const error = new Error('Not authenticated.')//gets error if request info is not valid
            error.statusCode = 401
            throw error
        }

        next() //send request to next function
    }
}