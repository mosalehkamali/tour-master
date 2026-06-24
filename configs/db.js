const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      // local database
      // await mongoose.connect("mongodb://localhost:27017/Kerman-Tour");
      
      // mongoDb Atlas 
      await mongoose.connect("mongodb+srv://mohisalehkamali_db_user:S1meM5ebiqowuc8W@cluster0.k0kq5ej.mongodb.net");
      
      // Host database
      // await mongoose.connect("mongodb://mohiabad_mosalehk:Mk3020566509@localhost:27017/mohiabad_tourDB");

      console.log("<<<🎇 MongoDB Connected Successfully 🎇>>>");
    }
  } catch (error) {
    console.log("Error while connecting to the database", error);
  }
};

export default connectToDB;
