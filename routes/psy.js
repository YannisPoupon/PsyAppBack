const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const psyCtrl = require('../controllers/psy');

router.get('/', auth, psyCtrl.getAllPsy);
router.get('/ByTown/:town', auth, psyCtrl.getTownPsy);
router.post('/', psyCtrl.createPsy);
router.get('/:id', auth, psyCtrl.getOnePsy);
router.put('/:id', auth, psyCtrl.modifyPsy);
router.delete('/:id', auth, psyCtrl.deletePsy);

module.exports = router;