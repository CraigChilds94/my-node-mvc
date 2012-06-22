/**
 *	Run controller
 *  Allow callback
 */


this.run = function(cb){
	// Allow method to be run.
	if(cb && typeof(cb) == 'function' && !this.c_doc.still){
		cb.call();
	}
	
	// do other necessary stuff
}

this.build = function(data, cb){
	this.c_doc.controller_name = data.doc.name();
	cb.call();
	
	var model_data = this.c_doc.model();
	if(data.model != ''){
		model_data.handle = require('../models/' + data.model + '_model');
	}
}

this.c_doc = {
	// give pid
	pid: process.pid,
	// if false dynamic; runs callback in .run()
	still: false,
	controller_name: '', 
	model: function(){
		info = {	
			handle: ''		
		}
		
		return info;
	}
}