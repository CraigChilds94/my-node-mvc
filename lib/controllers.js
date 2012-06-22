// load the controller
this.Load = function(name){
	return require('./controllers/' + name);
}