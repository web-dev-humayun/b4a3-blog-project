import express from 'express';
import { BlogController } from './blog.controller';
import { BlogPostValidation } from './blog.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/',
  validateRequest(BlogPostValidation.blogPostValidationSchema),
  BlogController.createBlog,
);
router.get('/', BlogController.getAllBlog);

router.patch(
  '/:id',
  validateRequest(BlogPostValidation.updateBlogPostValidationSchema),
  BlogController.updateBlog,
);

router.delete(
  '/:id',
  BlogController.deleteBlog,
);

export const BlogRoutes = router;
