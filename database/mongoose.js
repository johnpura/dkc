const mongoose = require('mongoose');
const options = {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true};

try {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.ATLAS_URI, options);
    console.log("Connected to Atlas cluster!");
} catch(e) {
    console.log("Failed to connect to Atlas cluster: " + e.message);
    process.exit(1);
}


module.exports = {mongoose};