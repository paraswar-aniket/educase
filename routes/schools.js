const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { addSchool, listSchools } = require('../controllers/schoolController');

router.post('/addSchool', auth, addSchool);
router.get('/listSchools', auth, listSchools);

module.exports = router;
