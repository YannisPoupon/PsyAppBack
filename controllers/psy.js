const Psy = require('../models/Psy')
const fs = require('fs');

exports.createPsy = (req, res, next) => {
  const psyObject = JSON.parse(req.body.psy);
  delete psyObject._id;
  const psy = new Psy({
    ...psyObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  Psy.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyPsy = (req, res, next) => {
  const psyObject = req.file ?
    {
      ...JSON.parse(req.body.psy),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Psy.updateOne({ _id: req.params.id }, { ...psyObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Praticien modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deletePsy = (req, res, next) => {
  Psy.findOne({ _id: req.params.id })
    .then(psy => {
      const filename = psy.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Psy.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Praticien supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOnePsy = (req, res, next) => {
    Psy.findOne({ _id: req.params.id })
    .then(psy => res.status(200).json(psy))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllPsy = (req, res, next) => {
    Psy.find()
    .then(psy => res.status(200).json(psy))
    .catch(error => res.status(400).json({ error }));
};