var http = require('http'), url = require('url'), sys = require('util'), fs = require('fs'), file = require('path'), init = require('./lib/controllers');

// view options
var view = {
	content_type: 'text/html',
	get: function(filepath){
		return fs.readFileSync('views/' + filepath + '.html', 'utf8');
	}
}

// Rendering options
var render = {
	// render views
	view: function(url, req, res){
		var html = view.get(url);
		res.writeHead(200, {'Content-Type': view.content_type + '; charset=utf-8'});
		console.log('View loaded:' + url);
		res.end(html);
	},
	// render error views
	error: function(type, req, res){
		var html = view.get('errors/' + type.toString());
		res.writeHead(type, {'Content-Type': view.content_type + '; charset=utf-8'});
		res.end(html);
	}
}

// set up routing objects & methods
var routes = {
	get: function(url) {
		info = {
			path: function(){
				parts = {
					first: function(){
						return getValue(1, url, '/');
					},
					second: function(){
						return getValue(2, url, '/');
					},
					last: function(){
						return getValue(getLength(url) + 1, url, '/');
					}
				};
				
				return parts;
				
			}, controller: function(){
				data = {
					name: function (){
						return getValue(getLength(url) + 1, url, '/') + '_controller';
					}
				};
				
				return data;
			}
		};
		
		return info;
	}
};

var server = http.createServer(function(request, response){
	// get the url
	var path = url.parse(request.url).pathname;
	
	if(path != "/favicon.ico"){
		// get info from url
		var info = routes.get(path);
		var c_data = info.controller();
		var prts = info.path();
		
		// start routing
		if(prts.last() == ''){
			// if empty then index.
			getView('index', request, response, c_data);		
		}else{
			// if the page exists render, else 404
			file.exists('views/' + prts.last() + '.html', function(exists){
				if(exists){
					getView(prts.last(), request, response, c_data);			
				}else{
					getError(404, request, response);
				}
			});
		}
	}else{
		// end the response if its a favicon
		response.end();
	}
});

server.listen(9999);

console.log('HTTP Server started.');

/**
 *	METHODS To return data
 */
 
 function routeReg(route, value){
 	return reg = new RegExp('^/' + route + '/' + value + '?$');
 }
 
 function getView(url, req, res, c_data){
 	// render our view
 	render.view(url, req, res);
 	
 	// load our controllers
 	var controller = init.Load(c_data.name());
 	
 	// run our controllers
 	controller.build(c_data);
 }
 
 function getError(type, req, res){
 	render.error(type, req, res);
 }
 
 function getValue(place, url, sep){
 	var parts = url.split(sep);
 	return parts[place];
 }
 
 function getLength(string, sep){
 	return string.split(sep).length;
 }