const auditoria = require('../modelBd/entity/Auditoria'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite registrar usuario 
 * @creation David Villanueva 07/12/2020
 * @update
 */
exports.registrarAuditoria = async function (oParam) { 
    const oResponse = {};
    try {
        var seqAuditoria = "'" +config.seqAuditoria +"'";
        var seq = await utilsDao.obtenetSequencia(seqAuditoria);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oAuditoria = {};
        oAuditoria.Id               = parseInt(seq.oData, 10);
        oAuditoria.TransaccionId    = oParam.oData.sTransaccionId;
        oAuditoria.Terminal         = oParam.oData.sTerminal;
        oAuditoria.Usuario          = oParam.oData.sUsuario;
        oAuditoria.Sistema          = oParam.oData.sSistema;
        oAuditoria.Aplicacion       = oParam.oData.sAplicacion;
        oAuditoria.NombreProceso    = oParam.oData.sNombreProceso;
        oAuditoria.FechaTransaccion = new Date(oParam.oData.dFechaTransaccion);
        oAuditoria.TiempoProceso    = oParam.oData.iTiempoProceso;
        oAuditoria.EntradaProceso   = oParam.oData.sEntradaProceso;
        oAuditoria.RespuestaProceso = oParam.oData.sRespuestaProceso;
        oAuditoria.Estado           = oParam.oData.sEstado; 
        const crearTablaPromise = await auditoria.create(oAuditoria);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oAuditoria;
    } catch (e) { 
        console.log(e);
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: auditoria, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}
 