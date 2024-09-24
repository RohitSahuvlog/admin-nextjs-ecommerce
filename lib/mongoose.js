const mongoose = require("mongoose");

function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI || "mongodb+srv://RohitSahu:Rohit1090@cluster0.iepjb1n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const mongoose = require("mongoose");

    function mongooseConnect() {
      if (mongoose.connection.readyState === 1) {
        console.log("MongoDB is already running.");
        return mongoose.connection.asPromise();
      } else {
        const uri = process.env.MONGODB_URI || "mongodb+srv://RohitSahu:Rohit1090@cluster0.iepjb1n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        console.log("MongoDB is not running, attempting to connect...");
        return mongoose.connect(uri);
      }
    }

    module.exports = { mongooseConnect };
    return mongoose.connect(uri);
  }
}

mongooseConnect()

module.exports = { mongooseConnect };