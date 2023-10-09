// Use express
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Get connection to RDS database
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'database-1.cjr4xepbcg55.us-east-1.rds.amazonaws.com',
    user: 'swoopermarket',
    password: 'swoopermarket',
    database: 'listings'
});

connection.connect();

// Define an API endpoint to GET all listings
app.get('/api/listings', (req, res) => {
    const query = 'SELECT * FROM listings';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching listings:', error);
            res.status(500).json({ error: 'An error occurred while fetching data' });
        } else {
            res.status(200).json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});