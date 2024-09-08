const User = require("../models/userModel");

const getUser = async () => {
    return new Promise(async (resolve, reject) => {
      try {
          const userdata = User.find();
          if(userdata!=null){
          resolve(userdata);
          }else {
          reject("userdata not found!");
        }
      } catch (err) {
        console.error("Getting error while retriving user data: ", err);
        reject(err);
      }
    });
  };

  module.exports = getUser;