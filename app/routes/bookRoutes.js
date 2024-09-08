const express = require("express");
const passport = require("passport");
const {booksController} = require("../controllers");

const bookRoutes = () =>{
    const bookRoutes = express.Router();
    const authenticate = passport.authenticate('jwt', { session: false });
    bookRoutes.use(authenticate);
    
    bookRoutes.get("/getallbooks",booksController.getAllBooks);
    bookRoutes.get("/getbooksbyname",booksController.getBookbyName);
    bookRoutes.get("/getbooksbyrentrange",booksController.getBookbyRentrange);
    bookRoutes.get("/searchbook",booksController.searchBook);
}

module.exports = bookRoutes;