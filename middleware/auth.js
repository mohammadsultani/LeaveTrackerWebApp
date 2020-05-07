const config = require('config')
const jwt = require('jsonwebtoken')
// The auth function the validity of token in requests.
function auth(req,res, next) {
    const token = req.header('x-auth-token')

    if(!token) return res.status(401).json({ feedback: "No token, authorization denied"})

    try {
        const decoded = jwt.verify(token,config.get('jwtSecret'))
        req.user = decoded 
        next()  
    } catch(e) {
        res.status(400).json({ feedback: 'Token is not valid!'})
    }
}
module.exports = auth