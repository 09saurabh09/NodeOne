
/*
 * GET home page.
 */
var app = require("../app.js")

exports.index = function(req, res){
  res.render('index', { name: app.sessionInfo.name });
};