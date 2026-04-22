const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Database connection import kiya
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Real Data Fetch Route
app.get('/api/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees'); 
        res.json(result.rows);
    } catch (err) {
        console.error("Connection Error:", err.message);
        res.status(500).send("Database connection failed!");
    }
});

app.get('/api/departments', async (req, res) => {
    try {
        const result = await pool.query('Select * from departments');
        res.json(result.rows);
    } catch (err) {
        console.error('Data connection failed', err.message);
        res.status(500).send("Database connection failed!");
    }
    
});

app.get('/api/locations', async (req, res) => {
    try {
        const result = await pool.query('select * from locations');
        res.json(result.rows);
    } catch (err) {
        console.error('data connection failed', err.message);
        res.status(500).send("passed");
    }
    
});

app.get('/api/regions', async (req, res) => {
    try {
        const result = await pool.query('select * from regions');
        res.json(result.rows);
    } catch {
        console.error("Data base is not found", err.message);
        res.status(500).send("fail");
    }

});

app.get('/api/jobs', async (req, res) => {
    try {
        const result = await pool.query('Select * from Jobs');
        res.json(result.rows);
    } catch (err){
        console.error('table is not founded', err.message);
        res.status(500).send('fail');

    }
})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
