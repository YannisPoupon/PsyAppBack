const User = require('../models/User')
const fs = require('fs');

// exports.createPsy = (req, res, next) => {
//   const psyObject = JSON.parse(req.body.psy);
//   delete psyObject._id;
//   const psy = new Psy({
//     ...psyObject,
//     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//   });
//   Psy.save()
//     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//     .catch(error => res.status(400).json({ error }));
// };

exports.modifyUser = (req, res, next) => {
  const userObject = req.file ?
    {
      ...JSON.parse(req.body.user),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Praticien modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then(user => {
      const filename = puserimageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        User.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Praticien supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllUser = (req, res, next) => {
    User.find()
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }));
};