'use strict';

const express = require('express');

const router = express.Router();
const controller = require('../controllers/credit-card-controller');

router.get('/', controller.works);
router.post('/', controller.create);

module.exports = router;
