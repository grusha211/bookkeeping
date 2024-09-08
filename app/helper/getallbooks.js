const Books = require("../models/bookModel");

const getBooks = async () => {
    return new Promise(async (resolve, reject) => {
      try {
          const Booksdata = Books.find();
          if(Booksdata!=null){
          resolve(Booksdata);
          }else {
          reject("Booksdata not found!");
        }
      } catch (err) {
        console.error("Getting error while retriving books data: ", err);
        reject(err);
      }
    });
  };
module.exports = getBooks;