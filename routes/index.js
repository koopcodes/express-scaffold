var express = require('express');
var router = express.Router();
var port = 3000;

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('port: ', port);
  res.render('index', {
    title: 'Express',
    port: port,
  });
});

module.exports = router;
