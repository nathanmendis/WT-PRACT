// mongodb.js
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
const dbName = 'Student'; // Replace with your database name

let db = null;

const connectDB = async () => {
    if (!db) {
        const client = new MongoClient(url);
        await client.connect();
        db = client.db(dbName).collection('Profile'); // Replace with your collection name
    }
    return db;
};

module.exports = connectDB;
