const { changeUserStatus } = require("../services/user");


const changeUserStatusController = async (req, res, next) => {
    const userId = req.params.id; 
    const newStatus = req.body.newStatus;
    try 
    {
        const updatedUser = await changeUserStatus(userId, newStatus);
        const userWithoutPassword = { ...updatedUser.toObject() };
        delete userWithoutPassword.password;
        res.status(200).json({ message: 'User status updated successfully', user: userWithoutPassword });
    } 
    catch (error) 
    {
        next(error);
    }
};



module.exports ={
    changeUserStatusController
}