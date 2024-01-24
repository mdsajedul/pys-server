const { loginService, registerService, passwordReset } = require("../services/auth")


const loginController =async (req,res,next)=>{
    const {phoneNumber,password} = req.body
    try {
        const token = await loginService({phoneNumber,password})
        res.status(200).json({message:'User logged in successfully', token})
    } catch (error) {
        next(error)
    }
}

const registerController =async (req,res,next)=>{
    const {fullName, phoneNumber, password, roles } = req.body
    try {
        const user = await registerService({fullName, phoneNumber, password, roles })
        res.status(201).json({message:'User Created Successfully',user})
    } catch (error) {
        next(error)
    }
}

const passwordResetController = async (req, res, next) => {
    const userId = req.params.id;
    const {oldPassword,newPassword} = req.body;

    try {
        const updatedUser = await passwordReset(userId, newPassword,oldPassword);
        const userWithoutPassword = { ...updatedUser.toObject() };
        delete userWithoutPassword.password;
        res.status(200).json({ message: 'Password reset successfully', user: userWithoutPassword });
    } catch (error) {
        next(error);
    }
};



module.exports = {
    loginController, registerController, passwordResetController
}