var mongoose = require( 'mongoose' );

exports.listPosts = function listPosts(callback){
	var BlogPost = mongoose.model( 'BlogPost' );
	BlogPost.find({ }, function(err, blogPosts) {
		if (err) {
			console.log(err);
		} else {
			console.log("Model.listPosts: " + blogPosts);
			callback("", blogPosts);
		}
	}
	);
}

exports.findPost = function findPost(id, callback){
	var BlogPost = mongoose.model( 'BlogPost' );
	console.log("Finding blogpost with id: " + id);
//	BlogPost.findOne({title: title}, function(err, blogPosts) {
	BlogPost.findById(id, function(err, blogPost) {
		if(err){
			console.log(err);
		} else {
			//console.log(blogPosts);
			console.log(blogPost);
			callback("", blogPost);
		}
	});
}


exports.addPost = function(blogPost, callback) {
	var BlogPost = mongoose.model( 'BlogPost' );
	var newBlogPost = new BlogPost({
	       	title: (blogPost.title || ""), 
	        text: (blogPost.text || ""),
	        date: (blogPost.date || "") });

	console.log("Model saving blogpost: " + blogPost + ", to " + newBlogPost);

	newBlogPost.save(callback);
}

exports.updatePost = function(id, blogPost, callback) {
	var BlogPost = mongoose.model( 'BlogPost' );
	BlogPost.findByIdAndUpdate(id, { $set: blogPost }, 
			function (err, newBlogPost) {
				if (err){
					console.log(err);
				} else {
					console.log("Updated: " + newBlogPost);
					callback("", newBlogPost);
				}
			});
}

exports.deletePost = function(id, callback) {
	var BlogPost = mongoose.model( 'BlogPost' );
	BlogPost.findById(id, function(err, blogPost) {
		if(err){
			console.log(err);
			callback(false);
		} else {
			console.log("Deleting " + blogPost);
			blogPost.remove();
			callback(true);
		}
	});
}
