//implementing .env
require('dotenv').config()
// implementing express
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Models or schemas
const Journal = require('./Models/Journal');

const app = new express()
const port = 8080;
const uri = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connecting mongodb using mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Could not connect to MongoDB'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes

// index route
app.get('/', (req, res) => {
    res.status(200).send({
        msg: 'server is running'
    });
});

app.post('/add-journals', (req, res) => {
    const incomingData = req.body;
    const newJournal = new Journal(incomingData);

    newJournal.save((err, result) => {
        if(err) {
            res.status(500).send({
                msg: 'Error',
                error: err
            });
        } else {
            res.status(200).send({
                msg: 'Journal has been added to MongoDB',
                data: result
            });
        }
    });
});

app.get('/get-all-journals', (req, res) => {
    Journal.find({}, (err, result) => {
        if(err) {
            res.status(500).send({
                msg: 'Error while finding the Journals'
            });
        }

        res.status(200).send({
            ms: 'Journals found',
            document: result

        })
    });
});

app.delete('/remove-journals', (req, res) => {
    Journal.deleteMany({}, (err, result) => {
        if(err) {
            res.status(500).send({
                msg: 'Error while deleting the journals'
            });
        }

        res.status(200).send({
            ms: 'Journals deleted',
            document: result
        })
    });
});

app.listen(port, () =>  {
    console.log('connected to port', port)
});