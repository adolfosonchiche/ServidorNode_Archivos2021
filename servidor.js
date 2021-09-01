//importamos los modulos que necesitamos
let http = require('http');
let fs = require('fs');

//para que este disponible en mi local host
//const ip = '127.0.0.1'; 
// en  el puerto 4000
const port = 4000;


//sentencia para escuchar las solicitudes 
// y responder al cliente

http.createServer(function(request, response){

    console.log('request ', request.url);

    if(request.url == "/archivos/index") {
        fs.readFile("./archivos/index.html", function(error, html) {
            let htmlString = html.toString();
            let ids = htmlString.match(/[^\{\}]+(?=\})/g);
            let titulo = "Servidor en Node";
            let contenido = "Bienvenido al laboratorio de Manejo" 
                +" e implementacion de archivos CUNOC";
            
            for (let k = ids.length -1; k >= 0; k--) {
                let valor = eval(ids[k]);
                htmlString = htmlString.replace("{" + ids[k] + "}", valor);
            };

            response.writeHead(400,{"Content-Type":"text/html"});
            response.write(htmlString);
            response.end();

        });
    } else{
        fs.readFile("./archivos/noEncontrado.html", function(error,html){
            response.write(html);
            response.end();
        });
    }

}).listen(port);

console.log('Running at http://localhost'   + ':' + port+'/');