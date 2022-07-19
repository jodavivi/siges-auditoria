const auditoria = require('../modelBd/entity/Auditoria'); 
const utils = require('./utils/utils'); 
const config = require('../config/config.json');  
const Sequelize =  require('sequelize');

/**
 * @description Función que permite consultar las aplicaciones
 * @creation David Villanueva 15/01/2021
 * @update
 */
exports.consultarAplicacion = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroTabla = {}; 
        oFiltroTabla.where ={}; 
        oFiltroTabla.where.CodEmpresa = oFiltro.sCodEmpresa; 
        oFiltroTabla.attributes = ['Aplicacion'];
        oFiltroTabla.group      = ['Aplicacion'] 
        const consultarTablaResponse = await  auditoria.findAll(oFiltroTabla); 
        if(consultarTablaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarTablaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de Auditoria'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: auditoria, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}

/**
 * @description Función que permite consultar los procesos 
 * @creation David Villanueva 15/01/2021
 * @update
 */
exports.consultarProceso = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroTabla = {}; 
        oFiltroTabla.where ={}; 
        oFiltroTabla.where.CodEmpresa = oFiltro.sCodEmpresa; 
        oFiltroTabla.attributes = ['NombreProceso'];
        oFiltroTabla.group      = ['NombreProceso'] 
        oFiltroTabla.where.Aplicacion = oFiltro.sAplicacion;
        const consultarTablaResponse = await  auditoria.findAll(oFiltroTabla); 
        if(consultarTablaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarTablaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de Auditoria'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: auditoria, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}

/**
 * @description Función que permite consultar los registros de auditoria segeun filtro
 * @creation David Villanueva 15/01/2021
 * @update
 */
exports.consultarAuditoria = async function (oFiltro) { 
    const oResponse = {};
    try {
        const Op = Sequelize.Op;
        var oFiltroTabla = {}; 
        oFiltroTabla.where ={};  
         
        if(oFiltro.sCodEmpresa){
            oFiltroTabla.where.CodEmpresa = oFiltro.sCodEmpresa;
        }
        if(oFiltro.sTransaccionId){
            oFiltroTabla.where.TransaccionId = oFiltro.sTransaccionId;
        }
        if(oFiltro.sAplicacion){
            oFiltroTabla.where.Aplicacion = oFiltro.sAplicacion;
        }
        if(oFiltro.sNombreProceso){
            oFiltroTabla.where.NombreProceso = oFiltro.sNombreProceso;
        } 
        if(oFiltro.dFechaInicio){
            oFiltroTabla.where.FechaTransaccion = { [Op.between]: [oFiltro.dFechaInicio + " 00:00:00", oFiltro.dFechaFin + " 23:59:59"] }
        }
        if(oFiltro.sEstado){
            oFiltroTabla.where.Estado =  oFiltro.sEstado;
        }

        if(oFiltro.iLimit){
            oFiltroTabla.limit = parseInt(oFiltro.iLimit,10);
        }
 
        oFiltroTabla.order =  [['Id', 'DESC']]; 
            
        const consultarTablaResponse = await  auditoria.findAll(oFiltroTabla); 
        if(consultarTablaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarTablaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de Auditoria'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: auditoria, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}