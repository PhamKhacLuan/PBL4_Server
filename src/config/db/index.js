const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

 async function connect(){
     try {
        await mongoose.connect(process.env.urlConnectDB),{
         useNewUrlParser : true,
         useUnifielTopology : true,
         useCreateIndex : true,
        }
     } catch (error) {
        console.log("Connect failure");
     }
}
module.exports = {connect};