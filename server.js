var express = require('express'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/samplebox');

var Path = mongoose.model('Path', {
	path: String,
	views: {type: Number, default: 1}
});

var app = express();

app.get('/', function(req, res){
	Path.findOne({path:'/'}, function (err, path) {
		if(err){
			return res.status(500).send('Something went wrong');
		}

		if(path){
			path.views++;

			path.save(function (err) {
				if(err){
					return res.status(500).send('Something went wrong');
				}
				res.send('This page have been shown '+ path.views);
			})
		}else{
			path = new Path({
				path : '/',
				views : 1
			});

			path.save(function (err) {
				if(err){
					return res.status(500).send('Something went wrong');
				}
				res.send('You are the first');
			});
		}
	});
});

app.listen(3000);
console.log('App started on port 3000');