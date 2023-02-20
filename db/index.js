const mongoose = require("mongoose")

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb+srv://jacobviv:cloob-password@cluster0.dwspyux.mongodb.net/cloob"

mongoose
  .set('strictQuery', false)
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = x.connections[0].name
    console.log(`Connected to Mongo! Database name: "${databaseName}"`)
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err)
  })
