import express from 'express';
import { adminController } from './admin.controller';

const router = express.Router();

router.patch(
  '/users/:userId/block',
  adminController.blockUserByAdmin,
);
router.delete(
  '/blogs/:id',
  adminController.deleteBlogByAdmin,
);

export const AdminRoutes = router;
