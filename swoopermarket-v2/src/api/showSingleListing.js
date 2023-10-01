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

// Define an API endpoint to GET listing of a single item by id
// item id should be at the end of url after /api/listings/
app.get('/api/listings/:id', (req, res) => {
    const itemListingId = req.params.id;
    const query = 'SELECT * FROM listings WHERE id = ?';

    connection.query(query, [itemListingId], (error, results) => {
        if (error) {
            console.error('Error fetching listings:', error);
            res.status(500).json({ error: 'An error occurred while fetching data' });
        } else {
            if (results.length == 0){
                res.status(404).json({error: 'Listing not found' });
            }
            else {
                res.status(200).json(results[0]);
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});