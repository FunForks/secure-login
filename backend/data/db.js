/** CONNECT TO DB */


const mongoose = require("mongoose");

const MONGOURL = process.env.MONGOURL || "mongodb+srv://"
const USERNAME = process.env.USERNAME || "dci-mentoring"
const PASSWORD = process.env.PASSWORD || "DC_mySecretKey_I"
const DATABASE = process.env.DATABASE || "secure-login"
const IS_LOCAL = process.env.IS_LOCAL || false
const URL = IS_LOCAL
  ? `mongodb://localhost:27017/${DATABASE}`
  : `${MONGOURL}${USERNAME}:${PASSWORD}@${DATABASE}.bbg1chr.mongodb.net/?retryWrites=true&w=majority`


const options = {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true
}


mongoose.connect(URL, options);

mongoose.connection.on("error", console.error);
mongoose.connection.on("open", function() {
  console.log(
    `Connection to ${DATABASE} database established
    `
  );
});