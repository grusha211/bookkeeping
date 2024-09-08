const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Books', require: true },
  issueDate: { type: Date},
  returnDate: { type: Date },
  totalRent: { type: Number },
});

module.exports = mongoose.model('Transaction', transactionSchema);
