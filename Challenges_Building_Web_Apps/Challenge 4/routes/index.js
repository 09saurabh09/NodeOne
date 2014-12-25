
/*
 * GET home page.
 */
var Post = require('../Post');
exports.index = function(req, res){
    // TODO: How do we get a list of all model objects using a mongoose model?
    Post.find(function(err, posts) {
        if (err) {
            res.send(500, 'There was an error - tough luck.');
        }
        else {
            res.render('index', {
                posts:posts
            });
        }
    });
};

exports.newpage = function(req,res){
    res.render('new',{});
};

exports.create = function(request,response){
    // TODO: Create and save a Post model
    var post = new Post({
      title:request.body.title,
      content:request.body.content
    });

    // TODO: Save the model
    post.save(function(err, model) {
        if (err) {
            response.send(500, 'There was an error - tough luck.');
        }
        else {
            response.redirect('/');
        }
    });
};

exports.jsonapi = function(req,res){
    Post.find(function(err,post){
        if(err){
            res.send(500,{success:false});
        }
        else {
            res.send({
                success:true,
                posts:post
            });
        }
    });
};