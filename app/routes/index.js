const authRoutes = require("./authRoutes");
const bookRoutes = require("./bookRoutes");
const transactionRoutes = require("./transactionRoutes");

const initRoutes = (app) => {
  app.use("/user", authRoutes);
  app.use("/books", bookRoutes);
  app.use("/transaction", transactionRoutes);
};

module.exports = initRoutes;
