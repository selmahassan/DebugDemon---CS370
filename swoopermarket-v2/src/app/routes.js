// Use express
const express = require('express');
const app = express();
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

// *** --------------------------- API ROUTES --------------------------- *** //

/** QUESTIONS
 * will frontend be parsing user input into a request body? If so, what are the fields?
 * what is the specific schema of the database? Where should I insert the new listing object into?
 * will database be generating unique listing ID for each listing?
 */

// new listing request route
app.post('/api/newlisting', (req, res) => {

  // data from React form in req.body
  const { title, description, price } = req.body;

  // Basic validation
  if(!title || !description || !price) {
    return res.status(400).json({error: 'Please include all required fields'});
  }

  // Create new listing object
  const newListing = {
    title,
    description, 
    price,
  
    // Additional fields
    category: req.body.category,
    condition: req.body.condition, 
    images: req.body.images,
    location: req.body.location,
    delivery: req.body.delivery,
  
    // Get user info
    user_id: req.user.id, 
    username: req.user.username,
  
    // Timestamp
    created_at: new Date()
  };

  // Insert into RDS database
  connection.query('INSERT INTO listings SET ?', newListing, (error, results) => {
    if(error) throw error;

    // Send back inserted listing
    res.status(201).json(newListing); 
  });

});

// Other routes

app.listen(5000);