// server.js
// Backend server for SurgeHub SMMA
// Serves the website and saves contact form submissions to a JSON file

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from /public folder
app.use(express.static(path.join(__dirname, 'public')));

// POST route to handle contact form submissions
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Create a submission object
  const submission = {
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  };

  // Read existing submissions from file, or start fresh
  fs.readFile('submissions.json', 'utf8', (err, data) => {
    let submissions = [];
    if (!err && data) {
      try {
        submissions = JSON.parse(data);
      } catch (e) {
        console.error('Error parsing existing submissions.json:', e);
      }
    }

    // Add the new submission
    submissions.push(submission);

    // Write updated submissions back to file
    fs.writeFile('submissions.json', JSON.stringify(submissions, null, 2), err => {
      if (err) {
        console.error('Error writing to submissions.json:', err);
      } else {
        console.log('New submission saved:', submission);
      }
    });
  });

  // Send thank-you page back to user
  res.send(`
    <html>
      <head>
        <title>Thanks for contacting us!</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
          a { color: #1a2b4c; text-decoration: none; }
        </style>
      </head>
      <body>
        <h1>Thanks for contacting us, ${name}!</h1>
        <p>We’ll get back to you shortly.</p>
        <a href="/">Return Home</a>
      </body>
    </html>
  `);
});

// Start server and listen on the correct port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
