
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , Post = require('./Post');

var app = express();

// all environments
app.set('port', process.env.PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Middleware for authentication
var auth = express.basicAuth(function(username,password){
  return username==='mawa' && password==='java';
});

// Render our home page with all blog posts
app.get('/', routes.index);

app.get('/users', user.list);

// Render a form to enter a new post
app.get('/new',auth,routes.newpage);

// create a new blog post object
app.post('/create',auth,routes.create);

//API to get all posts in JSON
app.get('/posts.json',routes.jsonapi);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
