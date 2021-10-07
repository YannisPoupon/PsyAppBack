const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const appointCtrl = require('../controllers/appointment');

router.get('/', auth, appointCtrl.getAllAppointment);
router.post('/', auth, appointCtrl.createAppointment);
router.post('/myAppointments', auth, appointCtrl.getMyAppointments);
router.get('/:id', auth, appointCtrl.getOneAppointment);
router.put('/:id', auth, appointCtrl.modifyAppointment);
router.delete('/:id', auth, appointCtrl.deleteAppointment);

module.exports = router;