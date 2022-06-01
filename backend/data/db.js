/** CONNECT TO DB */


const mongoose = require("mongoose");

const DATABASE = "secure-login"
const URL = `mongodb://localhost:27017/${DATABASE}`
const options = {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true
}


mongoose.connect(URL, options);

mongoose.connection.on("error", console.error);
mongoose.connection.on("open", function() {
  console.log(`Connection to ${DATABASE} database established`);
});