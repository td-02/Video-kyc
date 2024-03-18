// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/video_kyc', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define Schema and Model for Form Data
const FormDataSchema = new mongoose.Schema({
    fullName: String,
    dob: String,
    address: String,
    panAadhaar: String,
    signature: String,
    incomeRange: Number,
    employmentType: String
});
const FormData = mongoose.model('FormData', FormDataSchema);

// Endpoint to handle form submission
app.post('/submitForm', (req, res) => {
    const formData = req.body;

    // Save form data to MongoDB
    FormData.create(formData, (err, savedFormData) => {
        if (err) {
            console.error('Error saving form data:', err);
            res.status(500).json({ error: 'An error occurred while saving form data.' });
        } else {
            console.log('Form data saved successfully:', savedFormData);
            res.status(200).json({ message: 'Form submitted successfully!' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});