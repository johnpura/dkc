
const mongoose = require('mongoose');
const config = require('config');
const dbConfig = config.get('dbConfig');

const mongo = async () => {
    try {
        mongoose.Promise = global.Promise;
        await mongoose.connect(process.env.ATLAS_URI, dbConfig);
        console.log("Connected to Atlas cluster!");
    } catch(e) {
        console.log("Failed to connect to Atlas cluster: " + e.message);
        process.exit(1);
    }
};

module.exports = mongo;
