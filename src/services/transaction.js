const { default: mongoose } = require("mongoose");
const Transaction = require("../models/Transaction");
const error = require("../utils/error");
const { findUserByProperties, createNewUser } = require("./user");


const findOrCreateUser = async ({userId,fullName,phoneNumber,fatherName,address})=>{
    if(!userId){
        const newUser = await createNewUser({
            fullName,
            phoneNumber,
            fatherName,
            address
        })
        if(!newUser){
            throw error('Transaction failed due to problem with new user creation',400)
        }
        return newUser;
    }else{
        const user = await findUserByProperties('_id',userId);
        if(!user){
            throw error('Selected user not found, please contact with admin',400)
        }
        return user
    }
}

const findTransactions = () => {
    return Transaction.find()
        .populate({
            path:'event',
            select:'eventName eventDetails eventPlace eventDate',
            populate:{
                path:'eventType',
                select:'typeName'
            }
        })
        .populate({
            path:'submittedBy',
            select:'fullName fatherName'
        }) 
        .populate({
            path:'user',
            select:'fullName fatherName'
        })  
        .exec();
};



const performTransaction = async (transactionData) => {
    const { phoneNumber, amount, type, event, submittedBy, userId, fullName,fatherName,address, purpose } = transactionData;

    try{
        const transactionUser = await findOrCreateUser({userId,fullName,phoneNumber,fatherName,address})

        const transaction = new Transaction({
            amount,
            type,
            purpose,
            event,
            submittedBy,
            user: transactionUser._id,
        });

        if (!userId) {
            await transactionUser.save();
        }
        await transaction.save();
        return { success: true, message: "Transaction completed successfully" };
    }
    catch (error) {
        return { success: false, message: error.message };
    }

}

const calculateTotalDebitByEventId =async (eventId)=>{
    try {
        const totalDebit = await Transaction.aggregate([
            {
                $match: {event: mongoose.Types.ObjectId(eventId),type:'DEBIT'}
            },
            {
                $group: {_id:null, total: {$sum: "$amount"}}
            }
        ])
        return totalDebit.length > 0 ? totalDebit[0].total : 0;
    } catch (error) {
        return { success: false, message: error.message };
    }
} 

const calculateTotalCreditByEventId =async (eventId)=>{
    try {
        const totalCredit = await Transaction.aggregate([
            {
                $match: {event: mongoose.Types.ObjectId(eventId),type:'CREDIT'}
            },
            {
                $group: {_id:null, total: {$sum: "$amount"}}
            }
        ])
        return totalCredit.length > 0 ? totalCredit[0].total : 0;
    } catch (error) {
        return { success: false, message: error.message };
    }
} 

module.exports ={
    performTransaction, findTransactions, calculateTotalDebitByEventId, calculateTotalCreditByEventId
}