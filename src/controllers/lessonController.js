import express from 'express';
import { body, validationResult, query } from 'express-validator';
import ErrorMessage from '../constant/errorMessage';
import Lesson from '../models/lessonModel';

const router = express.Router();

router.post(
  '/',
  body('name').isLength({ min: 1 }),
  body('categoryId').isLength({ min: 1 }),
  body('image').isLength({ min: 1 }),
  body('words').isArray().optional(),
  async (req, res) => {
    const { name, categoryId, image, words = [] } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const lesson = await Lesson.create({ name, categoryId, words, image });
      res.sendSuccess(lesson);
    } catch (details) {
      res.sendError(ErrorMessage.ERROR_COMMON, details);
    }
  }
);

router.get('/', query('categoryId').isLength({ min: 1 }), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const lesson = await Lesson.find({ categoryId: req.query.categoryId });
    res.sendSuccess(lesson);
  } catch (details) {
    res.sendError(ErrorMessage.ERROR_COMMON, details);
  }
});

router.get('/:lessonId', async (req, res) => {
  const { lessonId } = req.params;
  try {
    const lesson = await Lesson.findById(lessonId);
    res.sendSuccess(lesson);
  } catch (details) {
    res.sendError(ErrorMessage.ERROR_COMMON, details);
  }
});

router.put('/:lessonId', body('name').isLength({ min: 1 }), body('image').isLength({ min: 1 }), body('words').isArray().optional(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, image, words } = req.body;
    const lesson = await Lesson.findOneAndUpdate({ _id: req.params.lessonId }, { name, image, words });
    res.sendSuccess(lesson);
  } catch (details) {
    res.sendError(ErrorMessage.ERROR_COMMON, details);
  }
});

export default router;
