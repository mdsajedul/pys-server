const { changeUserStatus, searchUsers, findUser, findUserWithoutSensitiveInfo } = require("../services/user");


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

const searchUsersController = async (req, res, next) => {
    const searchParam = req.query.searchParam;
    try {
      const users = await searchUsers(searchParam);
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  };

  const getAllUser = async (_req,res,next)=>{
    try {
      const users = await findUserWithoutSensitiveInfo();
      if(!users){
         res.status(400).json({ message:'Users not found!' });
      }
      res.status(200).json({ users });
    } catch (error) {
      next(error)
    }
  }


module.exports ={
    changeUserStatusController,
    searchUsersController,
    getAllUser
}