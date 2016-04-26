var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');

var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

var concurrencyCount = 0;
var fetchUrl = function (url, callback){
	var delay = parseInt((Math.random()* 10000000)%2000,10);

	concurrencyCount ++;
	console.log('现在的并发数是', concurrencyCount, ',正在抓取的是',url,',耗时'+delay+'毫秒');
	setTimeout(function(){
		concurrencyCount--;
		superagent.get(url)
			.end(function(err,res){
				console.log('fetch'+ url + 'successful');	
				var $ = cheerio.load(res.text);

				callback(null,{
					title: $('.topic_full_title').text().trim(),
					href: url,
					comment1: $('.reply_content').eq(0).text().trim()
				       	});
			});
	},delay);
};


superagent.get(cnodeUrl)
	.end(function(err,res){

		if(err){
			return console.error(err);
		}	

		var topicUrls = [];

		var $ = cheerio.load(res.text);

		$('#topic_list .topic_title').each(function (idx,element){
			var $element = $(element);

			var href = url.resolve(cnodeUrl, $element.attr('href'));
			topicUrls.push(href);
		});

		console.log(topicUrls);

		async.mapLimit(
			topicUrls,
		       	5, 
			function(url,callback){
				fetchUrl(url, callback);
			},
			function(null,result){ 
				console.log('---------------------------------------------'); 
				console.log('final:'); 
				console.log(result);
		        }
		);
	});
