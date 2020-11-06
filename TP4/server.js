var http = require('http');
var fs = require('fs');

http.createServer(function(req,res)
{
    
if(req.url.match(/\/[a][r][q][s]\/[0-9]+$/))
{
    var num = req.url.split("/")[2];
    
    
    fs.readFile('arqweb/arq' + num + '.html', function(err,data)
    {

        if (err) 
        {
            console.log("Erro na leitura do ficheiro " + err);
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write("<p>Ficheiro inexistente</p>");
            res.end();
        }

        else 
        {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(data);
            res.end();
        }
        
    })
}

else if(req.url.match(/\/[a][r][q][s]\/\*$/))
{
    fs.readFile('arqweb/index.html', function(err,data)
    {

        if (err) 
        {
            console.log("Erro na leitura do ficheiro " + err);
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write("<p>Ficheiro inexistente</p>");
            res.end();
        }

        else 
        {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(data);
            res.end();
        }
        
    })
}

else 
{
    res.write("Ficheiro nao esperado");
    res.end();
}

}).listen(7777);