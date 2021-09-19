import express from 'express';
import { body, validationResult } from 'express-validator';
import ErrorMessage from '../constant/errorMessage';
import Category from '../models/categoryModel';
import Lesson from '../models/lessonModel';

const router = express.Router();

router.post('/', body('name').isLength({ min: 1 }), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const category = await Category.create({
      name: req.body.name,
    });
    res.sendSuccess(category);
  } catch (details) {
    res.sendError(ErrorMessage.ERROR_COMMON, details);
  }
});

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});

    res.sendSuccess(categories);
  } catch (details) {
    res.sendError(ErrorMessage.ERROR_COMMON, details);
  }
});

router.get('/:categoryId', async (req, res) => {
  try {
    const categories = await Category.findById(req.params.categoryId);
    res.sendSuccess(categories);
  } catch (details) {
    res.sendError(ErrorMessage.ERROR_COMMON, details);
  }
});

router.delete('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    let categoryDeleted = 0;
    let lessonsDeleted = 0;
    categoryDeleted = await Category.findByIdAndDelete(categoryId);
    if (categoryDeleted) {
      lessonsDeletedResult = await Lesson.deleteMany({ categoryId: categoryDeleted._id });
    }
    res.sendSuccess({ categoryDeleted, lessonsDeleted: lessonsDeleted?.deletedCount });
  } catch (details) {
    res.sendError(ErrorMessage.ERROR_COMMON, details);
  }
});

export default router;
