var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("TCL: get", req.body)
  console.log("TCL: get", req.query)  
  res.render('index', { title: 'Express' });
});




//VK confirmation field
router.post('/confirm', (req, res, next) => {
  var request = require('request');
  if (req.body.type == 'confirmation') {
    res.send('0fd85cd9');
  } else if (req.body.type == 'message_new') {


    let answerUrl = 'https://api.vk.com/method/messages.send?message='+encodeURIComponent("Привет Ютуб!")+'&user_id='+req.body.object.from_id+'&access_token='+process.env.TOKEN+'&v=5.87';

    request(answerUrl, (err, responce, body) => {
        if (err) console.log('TCL: VkBot -> message -> err', err);
        res.status(200).send('ok');
    });
  }
});


router.get('*', (req, res, next) => {
  console.log("TCL: req", req.query);
  res.send('Уходи, тебе здесь не рады! Это не WORDPRESS');  
});





module.exports = router;