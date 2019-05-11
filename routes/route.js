function route (req, res, next) {

  var BotVK = require('../tools/ClassBotVK');
  
  switch (req.body.type) {
    case 'confirmation':
      BotVK.confirm(res);
      break;
    case 'message_new':
      BotVK.testAnswer(req, res);
      break;
    
      default:
        break;
    }
}

module.exports = route;