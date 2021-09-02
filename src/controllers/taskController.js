import { body, validationResult } from 'express-validator';
import express from 'express';
import Task from '../models/taskModel';
import ErrorMessage from '../constant/errorMessage';

const router = express.Router();

router.post('/', body('name').isLength({ min: 1 }), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const project = await Project.create({
      name: req.body.name,
      createdBy: req.currentUser._id
    });
    res.sendSuccess(project);
  } catch (details) {
    res.sendError(ErrorMessage.ERROR_COMMON, details);
  }
})


export default router;