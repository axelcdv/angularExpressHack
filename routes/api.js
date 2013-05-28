/*
 * Serve JSON to our AngularJS client
 */

var blogdata = require( '../models/blogPosts');

// Fake database
var data = {
	"posts": [
	{
		"title": "Lorem ipsum",
		"text": "test post ceci est un post de test lorem ipsum dolor machin truc"
	},
	{
		"title": "Sed egestas",
		"text": "et si on creait une appli sur heroku pour voir ? ça marche bien ? peut-être !"
	}
	]
};

// GET

exports.posts = function (req, res) {
	var posts = [];
	blogdata.listPosts(function(err, postlist) {
		console.log("Posts: " + postlist);
		postlist.forEach(function (post, i) {
			posts.push({
				id: post._id, // TODO not sure that's a proper id, should probably have a real one
				title: post.title || "",
				text: (post.text || "").substr(0, 50) + '...',
			});
		});
		res.json({
			posts: posts
		});
	});
};

exports.post = function (req, res) {
	var id = req.params.id;
	blogdata.findPost(id, function(err, blogPost){
		if (blogPost) {
			res.json({
				post: blogPost
			});
		} else {
			res.json(false);
		}
	});
};

// POST

exports.addPost = function(req, res) {
	console.log("Post: " + req.body.title + " " + req.body.text);
	blogdata.addPost({ title: req.body.title, text: req.body.text }, function(err, blogPost) {
		if (err){
			console.log(err);
		} else {
			console.log(blogPost);
			res.json(blogPost);
		}
	});
}

// PUT

exports.editPost = function (req, res) {
	var id = req.params.id;

	blogdata.updatePost(id, { 
		title: req.body.title, 
		date: req.body.date, 
		text: req.body.text
	}, function(err, blogPost) {
		if (err) {
			res.json(false);
		} else {
			res.json(blogPost);
		}});
};

// DELETE

exports.deletePost = function (req, res) {
	var id = req.params.id;

	blogdata.deletePost(id, function(success) {
		res.json(success);
	});
};

