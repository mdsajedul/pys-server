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

const createNewUser = ({fullName,phoneNumber,password,roles})=>{
    const user = new User({
        fullName,
        phoneNumber,
        password,
        roles: roles? roles : ['User'],
        status:'PENDING',
        registered:true
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

module.exports = {
    createNewUser,
    updateUser,
    findUser,
    findUserByProperties,
    changeUserStatus,
};
