const jwt = require('jsonwebtoken');
const { findUserByProperties } = require('../services/user');
const { JWTSecret } = require('../../config/config');


const authenticate = async(req,res,next)=>{
    try {
        let token = req.headers.authorization;
        if(!token){
            return res.status(401).json({message:'Unauthorized'})
        }
        token = token.split(' ')[1]

        const decode = jwt.decode(token,JWTSecret)
        const user = await findUserByProperties('_id',decode._id)
        if(!user){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = {
            fullName : user.fullName,
            phoneNumber: user.phoneNumber,
            roles: user.roles,
            _id: user._id
        }
        delete req.user.password
        next()
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
}

module.exports = authenticate;