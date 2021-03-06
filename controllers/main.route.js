const express = require('express');
const router = express.Router();
const model = require('../models/veiculos.model');

router.get('/', function(request, response){
	//console.log(request.isAuthenticated());
	model.list(function (veiculos) {
		last =  1;
	response.set("Content-Type", "text/html");
	response.render('./front-end/index', {
		data: veiculos,
		last: last
	})
})

});
router.get('/veiculos', function(request, response){
	//console.log(request.isAuthenticated());
	model.list(function (veiculos) {

	response.set("Content-Type", "text/html");
	response.render('./front-end/veiculos_main', {
		data: veiculos
	})
})

});

router.get('/:matricula', function(request, response){
	//console.log(request.isAuthenticated());
	model.read(request.params.matricula, function (veiculos) {

	response.set("Content-Type", "text/html");
	response.render('./front-end/main_compra', {
		data: veiculos
	})
})

});


module.exports = router;