import z from 'zod';

// BlogPost Validation Schema
const blogPostValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  author: z
    .object({
      name: z.string().optional(),
      email: z.string().email('Invalid email').optional(),
    })
    .optional(),
});

const updateBlogPostValidationSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  content: z.string().min(1, 'Content is required').optional(),
});

export const BlogPostValidation = {
  blogPostValidationSchema,
  updateBlogPostValidationSchema,
};
