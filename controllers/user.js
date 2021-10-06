const User = require('../models/user')

const bcrypt = require('bcrypt');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.user.password, 10)
  .then(hash => {
      const user = new User({
          userType: req.body.user.userType,
          email: req.body.user.email,
          password: hash,
          firstName: req.body.user.firstName,
          lastName: req.body.user.lastName,
          address: req.body.user.address
      });
      user.save()
      .then(() => res.status(201).json({ message : 'Utilisateur crée !' }))
      .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {
  User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  User.findByIdAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
    .catch(error => res.status(400).json({ error }));
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