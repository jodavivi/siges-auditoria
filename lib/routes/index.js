const express = require('express');
const router = express.Router();

const mantAuditoriaTxBusiness   = require('../business/MantAuditoriaTxBusiness');    

module.exports = function(){

    router.post('/', mantAuditoriaTxBusiness.registrarAuditoria);  

    return router;
}

