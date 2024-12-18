const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.post('/calculate', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);
    const age = parseInt(req.body.age, 10);
    const gender = req.body.gender;

    // Validation
    if (isNaN(weight) || isNaN(height) || weight <= 0 || weight > 500 || height <= 0 || height > 3) {
        return res.sendFile(path.join(__dirname, 'views', 'error.html'));
    }

    // BMI calculation
    const bmi = (weight / (height * height)).toFixed(2);
    let category = '';
    let healthTips = '';

    if (bmi < 18.5) {
        category = 'Underweight';
        healthTips = 'Consider eating more nutritious meals and consult a dietitian.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'Normal weight';
        healthTips = 'Great job! Maintain your healthy lifestyle.';
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = 'Overweight';
        healthTips = 'Incorporate regular exercise and a balanced diet into your routine.';
    } else {
        category = 'Obesity';
        healthTips = 'Consult a healthcare provider for personalized advice.';
    }

    res.send(`
        <html>
        <head>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <h1>Your BMI Result</h1>
            <p>BMI: ${bmi}</p>
            <p>Category: ${category}</p>
            <p>Health Tips: ${healthTips}</p>
            <a href="/">Go back</a>
        </body>
        </html>
    `);
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
