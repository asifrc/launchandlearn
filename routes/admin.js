var router = require('express').Router();

router.get('/', function(req, res, next) {
  res.render('admin', {});
});

module.exports = router;
