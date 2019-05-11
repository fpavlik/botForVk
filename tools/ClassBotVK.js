class BotVK {
    constructor(text) {
        this.text = text;
    }



    static createUser (req) {
        return new Promise ((resolve, reject) => {
            var request = require('request');
            const mongoose = require('mongoose');
            const UserModel = require('../db/UserModel');
    
            mongoose.connect(process.env.MONGO);
    
            let reqForVK = 'https://api.vk.com/method/users.get?user_ids='+req.session.idVK+'&fields=bdate&access_token='+process.env.TOKEN+'&v=5.87';
    
            request(reqForVK, (err, response, body) => {
                if (err) {
                    console.log('TCL: VkBot -> message -> err', err);
                    reject(err);
                }
                
                response = JSON.parse(response.body);
                response = response.response;


                req.session.vk = {userId : response[0]['id']};
                req.session.vk = {userName : response[0]['first_name']};
                req.session.vk = {userSurname : response[0]['last_name']};
                
                let currentUser = new UserModel({
                    name : {
                        firstName : response[0]['first_name'],
                        surname: response[0]['last_name']
                    },
                    birthday : response[0]['bdate'],
                    social: {
                        vk: {
                            id : response[0]['id']
                        }
                    }
                });
    
                currentUser.save()
                .then((user, err) => {
                    if (err) {
                        reject(err);
                        console.log("​VkBot -> addUser -> err", err)
                    }
                    resolve();
                });
                
            });

        });
    }


    static testAnswer(req, res) {
        var request = require('request');

        if (req.session.idVK == undefined) {
            req.session.idVK = req.body.object.from_id; 
        }

        this.createUser(req)
        .then(() => {
            this.send200(res);
			console.log("TCL: BotVK -> statictestAnswer -> req.session", req.session.vk)
        })
        .catch(err => {
			console.log("TCL: BotVK -> statictestAnswer -> err", err)
        });

    }

    static confirm(res) {
        res.send(process.env.CONFIRM);
    }

    static send200(res) {
        res.status(200).send('ok');
    }
}

module.exports = BotVK;