const config = require('./config/entorno.js'); 
const express = require('express');
const routes = require('./routes'); 
const bodyParser = require('body-parser');
const log4js = require("log4js"); 
//Crear Conexion a BD
const db = require('./config/db');

//importal modelo 
require('./modelBd/entity/Auditoria'); 

//Arrancar BD y creacion de tablas
db.sync()
    .then(()=> console.log('Conectado al Servidor'))
    .catch(error => console.log(error));

//crea un app de express
const app = express();
log4js.configure({
    appenders: {
        siges_auditoria: {
        type: "dateFile",
        filename: "../log/siges-auditoria.log",
        pattern: "yyyy-MM-dd",
        compress: true,
      },
    },
    categories: {
      default: { appenders: ["siges_auditoria"], level: "debug" },
    },
  });

app.use((req, res, next) => {
    console.log('Middleware 1');
    next();
});
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
 

//uso de mildware
app.use((req, res, next) => {
    next();
});

//Inicia Routes
app.use('/auditoria', routes());
 
//Servidor y puerto
const host = config.HOST;
const port = config.PORT; 
const logger = log4js.getLogger("siges_auditoria"); 
app.listen(port, host, () => {
     console.log('Servidor funcionando correctamente en el puerto: ' + port);
     logger.debug('Servidor funcionando correctamente en el puerto: ' + port); 
});