const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON requests

// POST route for /bfhl
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  // Input validation
  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: 'Invalid input format, data should be an array.',
    });
  }

  // Extract numbers and alphabets
  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item) && typeof item === 'string');

  // Extract highest lowercase alphabet
  const lowercaseAlphabets = alphabets.filter((char) => char === char.toLowerCase());
  const highestLowercaseAlphabet = lowercaseAlphabets.length
    ? [lowercaseAlphabets.sort().pop()]
    : [];

  // Static user information (replace with dynamic values as needed)
  const user_id = "john_doe_17091999";
  const email = "john@xyz.com";
  const roll_number = "ABCD123";

  // Response structure
  res.status(200).json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
  });
});

// GET route for /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
