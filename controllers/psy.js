const Psy = require('../models/psy')

const bcrypt = require('bcrypt');

exports.createPsy = (req, res, next) => {
  bcrypt.hash(req.body.psy.password, 10)
    .then(hash => {
      const psy = new Psy({
        userType: req.body.psy.userType,
        email: req.body.psy.email,
        password: hash,
        firstName: req.body.psy.firstName,
        lastName: req.body.psy.lastName,
        adeliNumber: req.body.psy.adeliNumber,
        approach: req.body.psy.approach,
        specializations: req.body.psy.specializations,
        hourPrice: req.body.psy.hourPrice,
        address: req.body.psy.address,
        consultationAddress: req.body.psy.consultationAddress,
        coordinates: req.body.psy.coordinates
      });
      psy.save()
        .then(() => res.status(201).json({ message: 'Praticien crée !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyPsy = (req, res, next) => {
  const psyObject = { ...req.body };
  Psy.updateOne({ _id: req.params.id }, { ...psyObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Praticien modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deletePsy = (req, res, next) => {
  Psy.findByIdAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Praticien supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getOnePsy = (req, res, next) => {
  Psy.findOne({ _id: req.params.id })
    .then(psy => res.status(200).json(psy))
    .catch(error => res.status(404).json({ error }));
};

exports.getTownPsy = (req, res, next) => {
  Psy.find({
    'consultationAddress.town': req.params.town
  })
    .then(psy => res.status(200).json(psy))
    .catch(error => res.status(404).json({ error }));
};

exports.advanceSearchPsy = (req, res, next) => {
  const query = {
    'consultationAddress.town': req.params.town
    // continuer de contrstruire la query pour une recherche avancée
  }
  Psy.find(query)
}

exports.getAllPsy = (req, res, next) => {
  Psy.find()
    .then(psy => res.status(200).json(psy))
    .catch(error => res.status(400).json({ error }));
};