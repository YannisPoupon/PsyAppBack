const Appointment = require('../models/appointment');
const userCtrl = require('../controllers/user');
const psyCtrl = require('../controllers/psy')

exports.createAppointment = (req, res, next) => {

    console.log('coucou appointment');

    const psy = psyCtrl.getOnePsy(req.body.psyId);
    const user = userCtrl.getOneUser(req.body.userId);

    const appointment = new Appointment({
        psy: psy,
        patient: user,
        date: req.body.date,
        duration: req.body.duration,
        appointmentAddress: { ...psy.consultationAddress }
    });

    appointment.save()
        .then(() => res.status(201).json({ message: 'Rendez-vous crée !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyAppointment = (req, res, next) => {
    Appointment.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Rendez-vous modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteAppointment = (req, res, next) => {
    Appointment.findByIdAndDelete({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Rendez-vous supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneAppointment = (req, res, next) => {
    Appointment.findOne({ _id: req.params.id })
        .then(appointment => res.status(200).json(appointment))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllAppointment = (req, res, next) => {
    Appointment.find()
        .then(appointment => res.status(200).json(appointment))
        .catch(error => res.status(400).json({ error }));
};