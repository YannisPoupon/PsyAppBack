const Appointment = require('../models/appointment');
const User = require('../models/user');
const Psy = require('../models/psy');
const appointment = require('../models/appointment');

exports.createAppointment = (req, res, next) => {

    let user;
    let psy;

    User.findOne({ _id: req.body.appointment.userId })
        .then(data => {
            user = data
            Psy.findOne({ _id: req.body.appointment.psyId })
                .then(data => {
                    psy = data
                    if (psy && user) {
                        const appointment = new Appointment({
                            psy: psy._id,
                            patient: user._id,
                            date: req.body.appointment.date,
                            duration: req.body.appointment.duration,
                            appointmentAddress: { ...psy.consultationAddress }
                        });
                        appointment.save()
                            .then(() => res.status(201).json({ message: 'Rendez-vous crée !' }))
                            .catch(error => res.status(400).json({ error }));
                    }
                })
                .catch(error => res.status(404).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));


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

exports.getMyAppointments = (req, res, next) => {
    console.log('coucou' + req.body);
    if (req.body.userType === 'user') {
        Appointment.find({ patient: req.body.id })
            .then((appointments) => res.status(200).json(appointments))
            .catch(error => res.status(400).json({ error }));
    } else if (res.body.userType === 'psy') {
        Appointment.find({ psy: req.body.id })
            .then((appointments) => res.status(200).json(appointments))
            .catch(error => res.status(400).json({ error }));
    }
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