const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/user.js');

router.get('/', auth, stuffCtrl.getAllUser);
router.post('/', auth, multer, stuffCtrl.createUser);
router.get('/:id', auth, stuffCtrl.getOneUser);
router.put('/:id', auth, multer, stuffCtrl.modifyUser);
router.delete('/:id', auth, stuffCtrl.deleteUser);

module.exports = router;