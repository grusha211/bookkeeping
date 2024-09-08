const Transaction = require("../models/transactionModel");
const Books = require("../models/bookModel");
const User = require("../models/userModel");

class transactionController {
    static async issueBook(req, res) {
        const { userId, bookId, issueDate } = req.body;
        try {
            const user = await User.findOne({ userId });
            const book = await Books.findOne({ bookId });

            if (!user || !book) {
                return res.status(400).json({ message: 'Invalid user or book' });
            }

            const transaction = new Transaction({
                userId: userId,
                bookId: bookId,
                issueDate: issueDate
            });

            await transaction.save();
            res.status(201).json({ message: 'Book issued successfully', transaction });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async returnBook(req, res) {
        const { userId, bookId, returnDate } = req.body;
        try {
            const transaction = await Transaction.findOne({ userId, bookId, returnDate: { $exists: false } });

            if (!transaction) {
                return res.status(400).json({ message: 'No active transaction found for this book' });
            }

            const issueDate = new Date(transaction.issueDate);
            const returnDateObj = new Date(returnDate);
            const rentDays = Math.ceil((returnDateObj - issueDate) / (1000 * 60 * 60 * 24));

            const book = await Books.findOne({ bookId });
            const totalRent = rentDays * book.rentPerDay;

            transaction.returnDate = returnDateObj;
            transaction.totalRent = totalRent;

            await transaction.save();
            res.status(200).json({ message: 'Book returned successfully', transaction });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async issuedBookdetails(req, res) {
        const { bookName } = req.body;

        try {
            // Find the book by name
            const book = await Books.findOne({ bookName });
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            const transactions = await Transaction.find({ bookId: book.bookId });

            if (transactions.length === 0) {
                return res.status(200).json({ message: 'No one has issued this book' });
            }

            // List of all people who issued the book
            const pastUsers = transactions.map((transaction) => transaction.userId);

            // Check if book is currently issued
            const currentTransaction = await Transaction.findOne({ bookId: book.bookId, returnDate: { $exists: false } });
            let currentlyIssuedBy = null;

            if (currentTransaction) {
                currentlyIssuedBy = currentTransaction.userId;
            }

            const response = {
                totalCount: pastUsers.length,
                pastUsers,
                currentlyIssuedBy: currentlyIssuedBy || 'Book not currently issued',
            };

            res.status(200).json(response);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async totalRentgenerated(req, res) {
        const { bookName } = req.body;

        try {
            const book = await Books.findOne({ bookName });
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            const transactions = await Transaction.find({ bookId: book.bookId, returnDate: { $exists: true } });

            const totalRentGenerated = transactions.reduce((total, transaction) => total + transaction.totalRent, 0);

            res.status(200).json({ bookName, totalRentGenerated });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async issuedBooksbyUserId(req, res) {
        const { userId } = req.query;

        try {
            let user;
            if (userId) {
                user = await User.findOne({ userId });
            }

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const transactions = await Transaction.find({ userId: user.userId });

            const booksIssued = await Promise.all(
                transactions.map(async (transaction) => {
                    const book = await Books.findOne({ bookId: transaction.bookId });
                    return book.bookName;
                })
            );

            res.status(200).json({ userName: user.name, booksIssued });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async issuedBooksbydaterange(req,res){
        const { startDate, endDate } = req.query;

  try {
    const transactions = await Transaction.find({
      issueDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });

    const booksIssued = await Promise.all(
      transactions.map(async (transaction) => {
        const book = await Books.findOne({ bookId: transaction.bookId });
        const user = await User.findOne({ userId: transaction.userId });
        return { bookName: book.bookName, issuedTo: user.name, issueDate: transaction.issueDate };
      })
    );

    res.status(200).json({ booksIssued });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
    }
}

module.exports = transactionController;