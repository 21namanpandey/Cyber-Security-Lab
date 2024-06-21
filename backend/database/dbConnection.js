import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "CYBERSECURITY",
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log(`Some error has occured while conncting database: ${error}`);
    });
};

export default dbConnection;
