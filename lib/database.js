this.build = function(model_schema){	
	var mongo = require('mongodb'),
	  Server = mongo.Server,
	  Db = mongo.Db;
	  
	var server = new Server('', 9999, {auto_reconnect: true});
	var db = new Db('mvc', server);
	
	db.open(function(err, db) {
	  if(!err) {
	    console.log("We are connected to the database");
	  }else{
	  	console.log(err);
	  }	
	});
}