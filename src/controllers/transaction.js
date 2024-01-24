
const { performTransaction, findTransactions } = require("../services/transaction");


const getAllTransaction = async (req, res, next) => {
    try {
      const transactions = await findTransactions();
      res.status(200).json({ transactions });
    } catch (err) {
      next(err);
    }
  };
  

const performTransactionController = async (req, res, next) => {
    const { phoneNumber, amount, type, eventId, userId, fullName, fatherName, address, purpose } = req.body;

    try {
        const result = await performTransaction({
            phoneNumber,
            amount,
            type,
            event:eventId,
            submittedBy: req.user._id,
            userId,
            fullName,
            fatherName,
            address,
            purpose,
        });

        if (result.success) {
            res.status(200).json({ success: true, message: "Transaction completed successfully" });
        } else {
            res.status(400).json({ success: false, message: result.message });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    performTransactionController,getAllTransaction
};
