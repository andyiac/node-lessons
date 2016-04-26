var express = require('express');

var app = express();

app.get('/',function(req,res){
	res.send(' 你好世界');
});

app.listen(3000,function(req,res){
	console.log('app listen on 3000');
});
