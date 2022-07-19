const Sequelize =  require('sequelize');
const db = require('../../config/db'); 

//db.createSchema("sistemas", { ifNotExists: true }).then(() => {
    // esquema para el servicio
//    });
//db.createSchema('sistemas', { ifNotExists: true });

const Auditoria = db.define('auditoria', { 
    Id : {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement : true
    },
    CodEmpresa             : Sequelize.STRING(4),
    Empresa             : Sequelize.STRING(64),
    TransaccionId       : {
                            type: Sequelize.STRING(64),
                            allowNull: false
                            },
    Terminal            : {
                            type: Sequelize.STRING(64),
                            allowNull: false
                            },
    Usuario             : {
                            type: Sequelize.STRING(64),
                            allowNull: false
                            },
    Sistema             : Sequelize.STRING(64),
    Aplicacion          : Sequelize.STRING(64),
    NombreProceso       : Sequelize.STRING(64),
    Url                 : Sequelize.STRING(128),
    FechaTransaccion    : Sequelize.DATE,
    TiempoProceso       : Sequelize.INTEGER,
    EntradaProceso      :  Sequelize.TEXT,
    RespuestaProceso    : Sequelize.TEXT,
    Estado              : Sequelize.STRING(16) 
} 
,
{
    schema: "sistemas",
});
 

module.exports = Auditoria;

