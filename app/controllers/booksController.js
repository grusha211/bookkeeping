const Books = require("../models/bookModel");
const {getBooks} = require("../helper/getallbooks")

class booksController{
    static async getBookbyName(req,res){
        const {bookName} = req.query;
        try {
            const books = await Books.find({ bookName: { $regex: bookName, $options: 'i' } });
            res.status(200).json(books);
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    }

    static async getBookbyRentrange(req,res){
        const {minRent, maxRent} = req.query;

        try {
            const books = await Books.find({ rentperday: { $gte: minRent, $lte: maxRent } });
            res.status(200).json(books);
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    }

    static async searchBook(req,res){
        const {bookName, category, minRent, maxRent} = req.query;

        try {
            const books = await Books.find({
              category: category,
              bookName: { $regex: bookName, $options: 'i' },
              rentperday: { $gte: minRent, $lte: maxRent }
            });
            res.status(200).json(books);
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    }

    static async getAllBooks(req,res){
        try{
          const books = await getBooks();
    
          res.status(200).send(books);
        } catch(err){
          res.status(500).send({error:err.message});
        }
      }
}

module.exports = booksController;