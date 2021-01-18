'use strict';

exports.works = async (req, res, next) => {
  try {
    res.status(200).send('credit-card works!');
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.create = async (req, res, next) => {
  console.log(req.body);
  try {
    res.status(200).send(req.body);
  } catch (error) {
    res.status(500).send(error);
  }
};