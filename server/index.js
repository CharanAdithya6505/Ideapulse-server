const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');
const {connectDB} = require('./config/db');
const app = express();
app.use(express.json())
app.use(cors())
const {createBlog, showAllBlogs, showBlog, updateBlog, deleteBlog} = require('./controllers/blogController')

app.post('/blogs', createBlog);
app.get('/blogs', showAllBlogs);
app.get('/blog/:id', showBlog);
app.put('/blog/:id', updateBlog);
app.delete('/blog/:id', deleteBlog);

const PORT = process.env.PORT || 3002;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});