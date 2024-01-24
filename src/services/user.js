const User = require("../models/User");
const error = require("../utils/error");

const findUser = ()=>{
    return User.find();
}

const findUserByProperties =(key,value)=>{
    if(key==='_id'){
        return User.findById(value).exec()
    }
    return User.findOne({[key]: value}).exec()
}


const createNewUser = ({fullName,phoneNumber,password,roles,register,fatherName,address})=>{
    const user = new User({
        fullName,
        phoneNumber,
        password,
        roles: roles? roles : ['USER'],
        status:'PENDING',
        registered:register? register : false,
        fatherName,
        address
    })
    return user.save()
}

const updateUser = async(id,data)=>{
    const user = await findUserByProperties('email', data.email);
    if(user){
        throw error('Email already in use!', 200);
    }
    return User.findByIdAndUpdate(id,{...data},{new: true})
}

const changeUserStatus = async (userId, newStatus) => {
    const validStatusValues = ["PENDING", "ACTIVE", "BLOCK"];

    if (!validStatusValues.includes(newStatus)) {
        throw error("Invalid status value",422);
    }

    const user = await findUserByProperties('_id',userId);
    if(!user){
        throw error("User not found",404);
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { status: newStatus },
        { new: true }
    );

    if (!updatedUser) {
        throw error("Status update failed",400);
    }
    return updatedUser;
};

const searchUsers = async (searchParam) => {
  const regex = new RegExp(searchParam, "i"); // "i" for case-insensitive search

  try {
    const users = await User.find({
      $or: [
        { phoneNumber: { $regex: regex } },
        { fullName: { $regex: regex } },
      ],
    }).exec();

    return users;
  } catch (error) {
    throw error("Error in searching users", 500);
  }
};

module.exports = {
    createNewUser,
    updateUser,
    findUser,
    findUserByProperties,
    changeUserStatus,
    searchUsers
};
