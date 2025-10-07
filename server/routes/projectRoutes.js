const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { auth, adminOnly } = require('../middleware/authMiddleware');
const { createProject, listProjects, getProject, approveProject, getMyProjects, deleteProject } = require('../controllers/projectController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + unique + ext);
  }
});
const upload = multer({ storage });

router.get('/', listProjects);
router.get('/mine', auth, getMyProjects);
router.get('/:id', getProject);
router.post('/', auth, upload.single('file'), createProject);
router.put('/:id/approve', auth, adminOnly, approveProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
