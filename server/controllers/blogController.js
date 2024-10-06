const dotenv = require("dotenv");
const { prismaClient } = require("../config/db");
const prisma = prismaClient;
dotenv.config();

const createBlog = async (req, res) => {
  try {
    const userId = req.userId
    const { title, content, author, image, category, authorPic, matter, tags } = req.body;

    if (!title || !content || !author || !category) {
      return res
        .status(400)
        .json({ message: "Title, content, author, and category are required" });
    }

    // Check if a blog with the same title already exists
    const existingBlog = await prisma.blogs.findFirst({
      where: { title },
    });

    if (existingBlog) {
      return res
        .status(409)
        .json({ message: "A blog with this title already exists" });
    }

    // Prepare tags data if provided
    const tagData = tags && tags.length > 0 
      ? await Promise.all(
          tags.map(async (tag) => {
            const existingTag = await prisma.tags.findFirst({
              where: { name: tag },
            });
            if (existingTag) {
              return { id: existingTag.id };
            }
            return { name: tag };
          })
        )
      : [];  // Use an empty array if tags are not provided

    // Create a new blog
    const blog = await prisma.blogs.create({
      data: {
        title,
        content,
        author,
        image: image || null,
        category,
        authorPic: authorPic || null,
        publishedDate: new Date(),
        matter: matter || null,
        tags: {
          create: tagData
        },
        user: {
          connect: { id: userId },  // Associate the blog with the userId
        },
      },
    });

    res.status(201).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while creating the blog",
        error: error.message,
      });
  }
};

const showAllBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blogs.findMany();
    res.status(200).json(blogs);
  } catch (e) {
    console.error(e);
    res.status(500).json("Internal server error");
  }
};

const showBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await prisma.blogs.findUnique({
      where: { id: parseInt(id) },
    });

    if (!blog) {
      return res.status(404).json("Blog not found");
    }

    res.status(200).json(blog);
  } catch (e) {
    console.error(e);
    res.status(500).json("Internal server error");
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const blog = await prisma.blogs.findUnique({
      where: { id: parseInt(id) },
    });

    if (!blog) {
      return res.status(400).json("Blog not found");
    }

    const updatedBlog = await prisma.blogs.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    res.status(200).json("Blog updated");
  } catch (e) {
    console.error(e);
    res.status(500).json("Internal server error");
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await prisma.blogs.findUnique({
      where: { id: parseInt(id) },
    });

    if (!blog) {
      return res.status(400).json("Blog not found");
    }

    const deletedBlog = await prisma.blogs.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json("Deleted successfully");
  } catch (e) {
    console.error(e);
    res.status(500).json("Internal server error");
  }
};

module.exports = { createBlog, showAllBlogs, showBlog, updateBlog, deleteBlog };
