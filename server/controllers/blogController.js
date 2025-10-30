import fs from 'fs';
import imagekit from '../configs/imagekit.js';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';

// ✅ Add Blog
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing Required Fields" });
    }

    // Read uploaded file from temporary storage
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload directly to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer, // buffer of image file
      fileName: imageFile.originalname,
      folder: '/blogs'
    });

    // Delete temporary file (important for Vercel)
    fs.unlinkSync(imageFile.path);

    // Use the optimized ImageKit URL
    const image = response.url;

    await Blog.create({ title, subTitle, description, category, image, isPublished });

    res.json({ success: true, message: "Blog Added Successfully" });

  } catch (error) {
    console.error("Error adding blog:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Single Blog by ID
export const getBlogId = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.json({ success: false, message: "Blog not Found" });
    }

    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Delete Blog
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);
    await Comment.deleteMany({ blog: id }); // delete related comments
    res.json({ success: true, message: "Blog Deleted Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Toggle Publish Status
export const togglePublished = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ success: false, message: "Blog ID is required" });

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({ success: true, message: "Blog Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Add Comment
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    res.json({ success: true, message: "Comment Added for Review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Comments for Blog
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
