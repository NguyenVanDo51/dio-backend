import { body, validationResult } from 'express-validator';
import express from 'express';
import Project from '../models/projectModel';
import Task from '../models/taskModel';
import ErrorMessage from '../constant/errorMessage';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.currentUser._id
    })
    res.sendSuccess(projects);
  } catch (details) {
    res.sendError(ErrorMessage.ERROR_COMMON, details);
  }
});

router.post('/', body('name').isLength({ min: 1 }), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.senValidateFailed(errors.array());
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

router.get('/:project_id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.project_id);
    res.sendSuccess(project);
  } catch (details) {
    res.sendError(ErrorMessage.ERROR_COMMON, details);
  };
})

router.get('/:project_id/tasks', async (req, res) => {
  try {
    const taskList = await Task.find({
      project_id: req.params.project_id,
    });
    res.sendSuccess(taskList);
  } catch (details) {
    res.sendError(ErrorMessage.ERROR_COMMON, details);
  };
});

router.post('/:project_id/tasks', body('name').isLength({ min: 1 }), body('description').isString(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.senValidateFailed(errors.array());
    }
    const task = await Task.create({
      name: req.body.name,
      description: req.body.description,
      project_id: req.params.project_id,
      createdBy: req.currentUser._id,
    });
    res.sendSuccess(task);
  } catch (details) {
    res.sendError(ErrorMessage.ERROR_COMMON, details);
  };
});

export default router;