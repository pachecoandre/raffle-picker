import mongoose from "mongoose";

class DB {
    static connect () {
        mongoose
          .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
          })
          .then(() => console.log("Connected to database"));
    }
}

export default DB
