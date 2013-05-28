var mongoose = require( 'mongoose' );

var blogPostSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
	title: String,
    text: String
});

mongoose.model('BlogPost', blogPostSchema);

mongoose.connect( 'mongodb://localhost/blog' );
