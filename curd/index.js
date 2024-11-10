const express = require('express');
const app = express();
const { MongoClient } = require('mongodb'); // Corrected import
const url = 'mongodb://localhost:27017';
const database = 'student';
 client = new MongoClient(url);

let dbCollection;

app.use(express.json()); // Middleware to parse JSON bodies

const dbConnect = async () => {
  if (dbCollection) {
    return dbCollection;
  }
  try {
    const result = await client.connect();
    console.log('Connected successfully to the database');
    const db = result.db(database);
    dbCollection = db.collection('profile');
    return dbCollection;
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw error;
  }
};

app.get('', async (req, res) => {
  try {
    let collection = await dbConnect();
    let result = await collection.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching data', error: error.message });
  }
});

app.post('', async (req, res) => {
  try {
    let collection = await dbConnect();
    let data = req.body;
    let result = await collection.insertOne(data);
    res.send({ message: 'Data inserted', insertedId: result.insertedId });
  } catch (error) {
    res.status(500).send({ message: 'Error inserting data', error: error.message });
  }
});

app.put('/:name', async (req, res) => {
    try {
      let collection = await dbConnect();
      let data = req.body;
      let result = await collection.updateOne(
        { name: req.params.name }, // Filter for the document to update
        { $set: data } // Update data
      );
  
      if (result.matchedCount > 0) {
        res.send({ message: 'Data updated', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).send({ message: 'No document found with the specified name' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error updating data', error: error.message });
    }
  });
  app.delete('/:name', async (req, res) => {
    try {
      let collection = await dbConnect();
      let result = await collection.deleteOne({ name: req.params.name }); // Filter for the document to delete
  
      if (result.deletedCount > 0) {
        res.send({ message: 'Document deleted successfully' });
      } else {
        res.status(404).send({ message: 'No document found with the specified name' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error deleting document', error: error.message });
    }
  });

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});