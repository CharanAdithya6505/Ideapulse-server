const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');
const { connectDB } = require('./config/db');
const { createBlog, showAllBlogs, showBlog, updateBlog, deleteBlog } = require('./controllers/blogController');
const { registerUser, loginUser, authenticateToken } = require('./controllers/authController'); // Import auth controllers

const app = express();
app.use(express.json());
app.use(cors());

// User authentication routes
app.post('/register', registerUser);
app.post('/login', loginUser);

// Blog routes (Protected with JWT for creating, updating, deleting blogs)
app.post('/blogs', authenticateToken, createBlog);
app.get('/blogs', showAllBlogs);
app.get('/blog/:id', showBlog);
app.put('/blog/:id', authenticateToken, updateBlog);
app.delete('/blog/:id', authenticateToken, deleteBlog);

const PORT = process.env.PORT || 3002;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});