var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var allLogged = {};

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  created_at: new Date(),
  updated_at: new Date(),
  doLogin: function(user, pass, req, res) {
    console.log("Hello Samin");
    new User({ username: user}).fetch().then(function(found) {
      if (found) {

        bcrypt.compare(pass+user, found.get("password"),function(err, flag) {
          if (flag) {allLogged[user] = true;res.json({success: "YAYAYAYAYAYAYAYAY"})}
          else{res.redirect(301, '/')}
        })
      }
    });

  },
  doSignup: function(user, pass, req, res){
    console.log(user,pass);
    new User({ username: user}).fetch().then(function(found) {
      if (found) {
        res.status(200).json({ error: 'Username taken, please try again!' })
      } else {
          bcrypt.hash(pass+user, null, null, function(err, hash) {
            new User({
              username: user,
              password: hash
            }).save().then(function(newUser)  {
                res.send(200, newUser);
            });
          });
      }
    });
  }
});

module.exports.user = User;
module.exports.logs = allLogged;
