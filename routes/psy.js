const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/psy');

router.get('/', auth, stuffCtrl.getAllPsy);
router.post('/', auth, multer, stuffCtrl.createPsy);
router.get('/:id', auth, stuffCtrl.getOnePsy);
router.put('/:id', auth, multer, stuffCtrl.modifyPsy);
router.delete('/:id', auth, stuffCtrl.deletePsy);

module.exports = router;