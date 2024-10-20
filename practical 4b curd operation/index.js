// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./mongodb');

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON requests

// Create
app.post('/api/items', async (req, res) => {
    const item = req.body;
    try {
        const db = await connectDB();
        const result = await db.insertOne(item);
        res.status(201).send({ id: result.insertedId });
    } catch (error) {
        res.status(500).send('Error inserting data: ' + error.message);
    }
});

// Read (Get All)
app.get('/api/items', async (req, res) => {
    try {
        const db = await connectDB();
        const items = await db.find().toArray();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send('Error fetching data: ' + error.message);
    }
});

// Read (Get by ID)
app.get('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectDB();
        const item = await db.findOne({ _id: new require('mongodb').ObjectId(id) });
        if (!item) {
            return res.status(404).send('Item not found');
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send('Error fetching data: ' + error.message);
    }
});

// Update
app.put('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const db = await connectDB();
        const result = await db.updateOne({ _id: new require('mongodb').ObjectId(id) }, { $set: updateData });
        if (result.modifiedCount === 0) {
            return res.status(404).send('Item not found or no changes made');
        }
        res.status(200).send('Item updated successfully');
    } catch (error) {
        res.status(500).send('Error updating data: ' + error.message);
    }
});

// Delete
app.delete('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectDB();
        const result = await db.deleteOne({ _id: new require('mongodb').ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).send('Item not found');
        }
        res.status(200).send('Item deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting data: ' + error.message);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
