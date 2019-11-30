const User = require('../models/user.model.js');
let jwt = require('jsonwebtoken');
let config = require('../../config/auth.config.js');

exports.login = (req, res) => {
    if(!req.body.userName || !req.body.passWord) {
        return res.status(400).send({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
    
    let userName = req.body.userName;
    let passWord = req.body.passWord;

    User.findOne({
        userName: userName,
        passWord: passWord
    }).then(user => {
        let token = jwt.sign({userName: userName},
            config.secret,
            {
                expiresIn: '24h'
            }
        );
        let refreshToken = jwt.sign({userName: userName},
            config.refreshSecret,
            {
                expiresIn: '7d'
            }
        );
    
        res.send({
            success: true,
            message: 'Authentication successful!',
            token: token,
            refreshToken: refreshToken
        })
    }).catch(err => {
        console.log(err)
        res.status(403).send({
            success: false,
            message: 'Incorrect username or password'
        });
    });
};

exports.getToken = (req, res) => {
    if(!req.body.refreshToken) {
        return res.status(400).send({
            success: false,
            message: 'Refresh token not found'
        });
    }
    
    let refreshToken = req.body.refreshToken;

    jwt.verify(refreshToken, config.refreshSecret, (err, decoded) => {
        if (err) {
            return res.json({
                success: false,
                message: 'Refresh Token is not valid'
            });
        } else {
            let token = jwt.sign({userName: decoded.userName},
                config.secret,
                {
                    expiresIn: '24h'
                }
            );
            res.send({
                success: false,
                token: token
            });
        }
      });
};