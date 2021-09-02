import projectController from '../controllers/projectController';
import express from 'express';
import auth from '../middlewares/auth';
import userController from '../controllers/userController';
import categoryController from '../controllers/categoryController';
import lessonController from '../controllers/lessonController';

let router = express.Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

router.use('/users', userController);
router.use('/projects', auth, projectController);
router.use('/categories', categoryController)
router.use('/lessons', lessonController)

// Export API routes
export default router;