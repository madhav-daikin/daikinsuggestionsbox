const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const suggestionRoutes = require('./routes/suggestions');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/suggestions', suggestionRoutes);

// Serve the index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
