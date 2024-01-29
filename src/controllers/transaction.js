
const { performTransaction, findTransactions, calculateTotalDebitByEventId, calculateTotalCreditByEventId, calculateTransactionTotalsByEventId } = require("../services/transaction");


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

const calculateTotalDebitByEventIdController = async (req,res,next)=>{
    const {eventId} = req.params;
    try {
        const totalDebit = await calculateTotalDebitByEventId(eventId);
        if(!totalDebit){
            res.status(400).json({ success: false, message: "Event not found!" });
        }
        res.status(200).json({ success: true, totalDebit: totalDebit });

    } catch (error) {
        next(error)
    }
}

const calculateTotalCreditByEventIdController = async (req,res,next)=>{
    const {eventId} = req.params;
    try {
        const totalCredit = await calculateTotalCreditByEventId(eventId);
        if(!totalCredit){
            res.status(400).json({ success: false, message: "Event not found!" });
        }
        res.status(200).json({ success: true, totalCredit: totalCredit });

    } catch (error) {
        next(error)
    }
}

const getTransactionTotalsByEventId = async (req, res, next) => {
    const { eventId } = req.params;
    console.log(eventId)
    try {
        const transactionTotals = await calculateTransactionTotalsByEventId(eventId);

        if (transactionTotals.success) {
            res.status(200).json(transactionTotals);
        } else {
            res.status(400).json({ success: false, message: transactionTotals.message });
        }
    } catch (error) {
        next(error);
    }
};


module.exports = {
    performTransactionController,
    getAllTransaction,
    calculateTotalDebitByEventIdController,
    calculateTotalCreditByEventIdController,
    getTransactionTotalsByEventId
};
