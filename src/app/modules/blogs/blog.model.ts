import mongoose, { Schema } from 'mongoose';
import { TBlog } from './blog.interface';

// BlogPost Schema Definition
const blogPostSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true ,},
    content: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref:"Users"
    },
  },
  {
    timestamps: true,
  },
);

// Model Creation
export const BlogPost = mongoose.model<TBlog>('BlogPosts', blogPostSchema);
