/**
 *	Run controller
 *  Allow callback
 */
this.model_data = {
	handle: ''
}

this.c_doc = {
	// give pid
	pid: process.pid,
	// if false dynamic; runs callback in .run()
	still: false,
	controller_name: '', 
}

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
	
	this.model_data.handle = require('../models/' + data.model + '_model');
}