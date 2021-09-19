const express = require('express');
const router = express.Router();
const webpush = require('web-push');
const dataService = require('../services/dataService');
const settings = require('../../settings.json');

router.get('/public-key', function (req, res, next) {
  console.log('public-key');
  res.json({
    publicKey: settings.push.publicKey
  });
});

/*router.get('/generate-keys', function (req, res, next) {
  const vapidKeys = webpush.generateVAPIDKeys()
  res.json(vapidKeys);
});*/

// salva la registrazione su DB
router.post('/registration', async function (req, res) {
  const data = req.body;

  console.log('register', data);

  const result = await dataService.addSubscription(data);

  res.json(result);
});

// cancella la registrazione dal DB
router.delete('/registration', async function (req, res) {
  const data = req.body;

  console.log('unsubscribe', data.endpoint);

  const result = await dataService.deleteSubscription(data.endpoint);

  res.json(result);
});

module.exports = router;
