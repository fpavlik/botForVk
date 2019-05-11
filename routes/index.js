var express = require('express');
var router = express.Router();
var route = require('./route');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bot for VK via Node.js by Filipp Pavlik' });
});

//VK routing (conformation and new mesage)
router.post('/', route);








router.get('*', (req, res, next) => {
  console.log("TCL: req", req.query);
  res.send('Уходи, тебе здесь не рады! Это не WORDPRESS');  
});





module.exports = router;