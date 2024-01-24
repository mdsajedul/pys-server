const { default: mongoose } = require("mongoose");

const transactionSchema = new mongoose.Schema({
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['CREDIT', 'DEBIT'],
      required: true,
    },
    purpose: {
      type: String,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    updatedBy:[
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            dateTime: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },{timestamps:true});
  
  const Transaction = mongoose.model('Transaction', transactionSchema);
  
  module.exports = Transaction;