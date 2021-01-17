const auditoriaRxDao	= require('../dao/AuditoriaRxDao');  
const utils 			= require('../utils/utils'); 
 
/**
 * @description Función que permite consultar las aplicaciones de autoria
 * @creation David Villanueva 15/01/2021
 * @update
 */
exports.consultarAplicacion = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
 
		 //Consultanmos las aplicaicones
		 var oAuditoria 	= {};  
		 const consultarAplicacionResponse = await  auditoriaRxDao.consultarAplicacion(oAuditoria); 
		 if(consultarAplicacionResponse.iCode !== 1){
			throw new Error(consultarAplicacionResponse.iCode + "||" + consultarAplicacionResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarAplicacionResponse.oData;
		
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
		oResponse.oData	= oRequest.oData;
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};

/**
 * @description Función que permite consultar los procesos de auditoria
 * @creation David Villanueva 15/01/2021
 * @update
 */
exports.consultarProceso = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req); 

		//Consultanmos las aplicaicones
		var oAuditoria 	= {};  
		oAuditoria.sAplicacion = req.query.sAplicacion;
		const consultarProcesoResponse = await  auditoriaRxDao.consultarProceso(oAuditoria); 
		if(consultarProcesoResponse.iCode !== 1){
		   throw new Error(consultarProcesoResponse.iCode + "||" + consultarProcesoResponse.sMessage);
		}
		 oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData		= consultarProcesoResponse.oData;
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

/**
 * @description Función que permite consultar auditoria segun filtro
 * @creation David Villanueva 15/01/2021
 * @update
 */
exports.consultarAuditoria = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req); 

		//Consultanmos las aplicaicones
		var oAuditoria 	= {};  
		oAuditoria.sTransaccionId   = req.query.sTransaccionId;
		oAuditoria.sAplicacion 		= req.query.sAplicacion;
		oAuditoria.sNombreProceso 	= req.query.sNombreProceso;
		oAuditoria.dFechaInicio 	= req.query.dFechaInicio;
		oAuditoria.dFechaFin 		= req.query.dFechaFin;
		oAuditoria.sEstado 			= req.query.sEstado;
		oAuditoria.iLimit 			= req.query.iLimit;
		const consultarAuditoriaResponse = await  auditoriaRxDao.consultarAuditoria(oAuditoria); 
		if(consultarAuditoriaResponse.iCode !== 1){
		   throw new Error(consultarAuditoriaResponse.iCode + "||" + consultarAuditoriaResponse.sMessage);
		}
		 oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData		= consultarAuditoriaResponse.oData;
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};
