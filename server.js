const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json({extended: false}));

// Defining routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/post', require('./routes/post'));
app.use('/api/tags', require('./routes/tags'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));