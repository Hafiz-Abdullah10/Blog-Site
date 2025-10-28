import express from 'express'
import { addBlog, addComment, deleteBlogById, getAllBlogs, getBlogComments, getBlogId, togglePublished } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('image'), addBlog)
blogRouter.get('/all', getAllBlogs);
blogRouter.post('/delete',auth, deleteBlogById);
blogRouter.post('/toggle-publish',auth, togglePublished);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comment', getBlogComments);
blogRouter.get('/:blogId', getBlogId);

export default blogRouter;