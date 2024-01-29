const express = require('express');
const { connectToDB, getDb } = require('./db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let db;

connectToDB((err) => {
  if (err) {
    console.error('Error connecting to db:', err);
  } else {
    console.log('Successfully connected to db');
    db = getDb();
  }
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});

app.post('/push-data', (req, res) => {
  try {
    const _id = Math.floor(Math.random() * 100000);
    let data = req.body;

    // Ensure you are using the correct collection name
    db.collection('expenses').insertOne({ _id, ...data });
    console.log('Successfully inserted');

    res.status(200).json({ message: 'Successfully inserted' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Error inserting data' });
  }
});

app.get('/get-data', async (req, res) => {
    try {
      const collection = db.collection('expenses');
      const data = await collection.find().toArray();
  
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Error fetching data' });
    }
  });
  