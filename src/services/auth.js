const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { findUserByProperties, createNewUser } = require('./user');
const { bcryptSalt, JWTSecret } = require('../../config/config');
const error = require('../utils/error');
const User = require('../models/User');

const registerService = async({fullName,phoneNumber,password,roles })=>{
    let user = await findUserByProperties('phoneNumber', phoneNumber);
   
    if(user) throw error('User already exist!',400)
    const salt =await bcrypt.genSalt(parseInt(bcryptSalt));
    const hash = await bcrypt.hash(password, salt);
    return createNewUser({fullName, phoneNumber, password: hash, roles})
}

const loginService =async ({phoneNumber,password})=>{
    const user = await findUserByProperties('phoneNumber',phoneNumber)
    if(!user){
        throw error('Invalid Credential',400);
    }
    const isMatch = await bcrypt.compare(password,user?.password);
    if(!isMatch) {
        throw error('Invalid Credential',400)
    }
    const payload = {
        _id: user._id,
        phoneNumber: user.phoneNumber,
        fullName: user.fullName,
        roles: user.roles
    }
    return jwt.sign(payload,JWTSecret,{expiresIn:'72h'})
}

const passwordReset = async (id, newPassword, oldPassword) => {
    const user =await findUserByProperties('_id',id);
    if(!user){
        throw error('User not found!',404);
    }
    const isOldPasswordMatch = await bcrypt.compare(oldPassword,user?.password); 
    if(!isOldPasswordMatch){
        throw error('Old password not match!',400);
    }
    const salt =await bcrypt.genSalt(parseInt(bcryptSalt));
    const hashedPassword = await bcrypt.hash(newPassword, salt); 

    return User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
};


module.exports = {
    registerService, loginService, passwordReset
}