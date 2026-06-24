const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      // local database
      // await mongoose.connect("mongodb://localhost:27017/Kerman-Tour");
      
      // mongoDb Atlas 
      await mongoose.connect("mongodb+srv://mosalehk7:Mk3020566509@cluster0.sshzl77.mongodb.net/?appName=Cluster0");
      
      // Host database
      // await mongoose.connect("mongodb://mohiabad_mosalehk:Mk3020566509@localhost:27017/mohiabad_tourDB");

      console.log("<<<🎇 MongoDB Connected Successfully 🎇>>>");
    }
  } catch (error) {
    console.log("Error while connecting to the database", error);
  }
};

export default connectToDB;
