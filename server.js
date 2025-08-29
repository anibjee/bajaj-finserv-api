const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions
function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function isAlphabet(char) {
    return /^[a-zA-Z]$/.test(char);
}

function isSpecialCharacter(char) {
    return !isNumber(char) && !isAlphabet(char);
}

function processArray(data) {
    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    const alphabetChars = [];

    data.forEach(item => {
        const str = String(item);
        
        if (isNumber(str)) {
            const num = parseInt(str);
            sum += num;
            
            if (num % 2 === 0) {
                evenNumbers.push(str);
            } else {
                oddNumbers.push(str);
            }
        } else if (str.length === 1 && isAlphabet(str)) {
            alphabets.push(str.toUpperCase());
            alphabetChars.push(str);
        } else if (str.length > 1) {
            // Handle multi-character strings
            for (let char of str) {
                if (isAlphabet(char)) {
                    alphabets.push(char.toUpperCase());
                    alphabetChars.push(char);
                } else if (isSpecialCharacter(char)) {
                    specialCharacters.push(char);
                }
            }
        } else {
            specialCharacters.push(str);
        }
    });

    return {
        evenNumbers,
        oddNumbers,
        alphabets,
        specialCharacters,
        sum: sum.toString(),
        alphabetChars
    };
}

function createConcatString(alphabetChars) {
    // Reverse the array and create alternating caps
    const reversed = alphabetChars.reverse();
    let result = '';
    
    for (let i = 0; i < reversed.length; i++) {
        if (i % 2 === 0) {
            result += reversed[i].toUpperCase();
        } else {
            result += reversed[i].toLowerCase();
        }
    }
    
    return result;
}

// POST route for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        // Validation
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input. 'data' should be an array."
            });
        }

        // Process the array
        const processed = processArray(data);
        
        // Create concatenated string
        const concatString = createConcatString([...processed.alphabetChars]);

        // Response object
        const response = {
            is_success: true,
            user_id: "john_doe_17091999", // You should replace this with your actual details
            email: "john@xyz.com", // Replace with your email
            roll_number: "ABCD123", // Replace with your roll number
            odd_numbers: processed.oddNumbers,
            even_numbers: processed.evenNumbers,
            alphabets: processed.alphabets,
            special_characters: processed.specialCharacters,
            sum: processed.sum,
            concat_string: concatString
        };

        res.status(200).json(response);
        
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// GET route for /bfhl (optional, for testing)
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Health check route
app.get('/', (req, res) => {
    res.json({ 
        message: "Bajaj Finserv API is running",
        endpoints: {
            post: "/bfhl",
            get: "/bfhl"
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
