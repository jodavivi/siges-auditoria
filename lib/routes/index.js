const express = require('express');
const router = express.Router();

const mantAuditoriaTxBusiness   = require('../business/MantAuditoriaTxBusiness');    
const mantAuditoriaRxBusiness   = require('../business/MantAuditoriaRxBusiness');    

module.exports = function(){

    router.get('/aplicacion', mantAuditoriaRxBusiness.consultarAplicacion);  
    router.get('/aplicacion/proceso', mantAuditoriaRxBusiness.consultarProceso);
    router.get('/', mantAuditoriaRxBusiness.consultarAuditoria);   
    router.post('/', mantAuditoriaTxBusiness.registrarAuditoria);  

    return router;
}

