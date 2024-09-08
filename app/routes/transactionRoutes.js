const express = require("express");
const passport = require("passport");
const {transactionController} = require("../controllers");

const transactionRoutes = () =>{
    const transactionRoutes = express.Router();
    
    const authenticate = passport.authenticate('jwt', { session: false });
    transactionRoutes.use(authenticate);

    transactionRoutes.post("/issueBook", transactionController.issueBook);
    transactionRoutes.post("/returnBook", transactionController.returnBook);
    transactionRoutes.post("/issuedBookusers", transactionController.issuedBookdetails);
    transactionRoutes.post("/totalrent", transactionController.totalRentgenerated);
    transactionRoutes.post("/booksbyuser",transactionController.issuedBooksbyUserId);
    transactionRoutes.post("/booksbydate", transactionController.issuedBooksbydaterange);

}

module.exports = transactionRoutes;