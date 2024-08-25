const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); 
app.use(cors());
app.post('/bfhl', (req, res) => {
    const data = req.body.data; 

    const userId = 'nsuryaprabha'; 
    const email = 'nsprabha2609.com'; 
    const rollNumber = '21BRS1294'; 
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && item.toLowerCase() === item);
    const highestLowercaseAlphabet = alphabets.length > 0 ? alphabets.sort().reverse()[0] : '';

    // Response Structure
    const response = {
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };

    res.json(response);
});

app.get('/bfhl', (req, res) => {
    const response = { 
        operation_code: 1
    };
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});