var db = require('../config');
var User = require('../models/user').user;

var Users = new db.Collection();

Users.model = User;

module.exports = Users;
