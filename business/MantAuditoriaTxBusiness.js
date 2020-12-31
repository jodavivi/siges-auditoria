const auditoriaTxDao	= require('../dao/AuditoriaTxDao');  
const utils 			= require('../utils/utils'); 
 
/**
 * @description Función que permite registrar auditoria
 * @creation David Villanueva 07/12/2020
 * @update
 */
exports.registrarAuditoria = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
 
		 //Regustramos la auditoria
		 var oAuditoria 	= {}; 
		 oAuditoria.oData	= oRequest.oData;  
		 const registrarAuditoriaResponse = await  auditoriaTxDao.registrarAuditoria(oAuditoria); 
		 if(registrarAuditoriaResponse.iCode !== 1){
			throw new Error(registrarAuditoriaResponse.iCode + "||" + registrarAuditoriaResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		
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

 