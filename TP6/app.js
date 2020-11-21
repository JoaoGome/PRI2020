var http = require('http')
var axios = require('axios')
var fs = require('fs')

var {parse} = require('querystring')
const file = require('./db.json')
var currentID = 1;

file.tarefas.forEach(f => {
    currentID++;
})

//função que vai buscar info do form de registo de uma tarefa nova
function recuperaInfo(request,callback)
{
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded') 
    {
       let body = 'id=' + currentID + '&';
       currentID++;
        
        request.on('data',bloco => {
            body += bloco.toString();
        })

        request.on('end',() => {
            var newBody = body.slice(0,-1);
            newBody += '&status=active';
            callback(parse(newBody));
        })
    }
}

// POST Confirmation HTML Page Template -------------------------------------
function geraPostConfirm(tarefa){
    return `
    <html>
    <head>
        <title>POST receipt: ${tarefa.id}</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Tarefa ${tarefa.id} inserido</h1>
            </header>

            <div class="w3-container">
                <p><a href="/tarefas">Voltar</a></p>
            </div>
        </div>
    </body>
    </html>
    `
}

//template para a tabela com lista de tarefas em execução e tabela com as tarefas já terminadas
function geraMain (data)
{
    let pagHTML = 
    `
    <html>
        <head>
            <title> toDo List</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <script src="https://kit.fontawesome.com/4f25f0ae6e.js"></script>
            <style>
                caption 
                {
                    display: table-caption;
                    text-align: center;
                    font-size: 28px;
                }
                
                .btn {
                    background-color: DodgerBlue;
                    border: none;
                    color: white;
                    padding: 8px 18px;
                    font-size: 16px;
                    cursor: pointer;
                  }
                  
                  /* Darker background on mouse-over */
                  .btn:hover {
                    background-color: RoyalBlue;
                  }
            </style>
        </head>

        <body>

            <div class="w3-container w3-teal">
                <h2>Registo de Tarefa</h2>
            </div>

            <form class="w3-container" action="/tarefas" method="POST">
            <label class="w3-text-teal"><b>Designação</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="designacao">

            <label class="w3-text-teal"><b>Data limite</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="prazo">

            <label class="w3-text-teal"><b>Responsável</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="responsavel">
  
            <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
            <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>

            <br/>
            <br/>

            <table class="w3-table w3-bordered">
                <caption><b>Tarefas em execução</b></caption>
                <tr>
                    <th width="25%">Designação</th>
                    <th width="25%">Data Limite</th>
                    <th width="25%">Responsável</th>
                    <th width="5%"></th>
                    <th width="5%"></th>
                    <th width="15%"></th>

                </tr>
    `

    data.forEach(d => {
        if(d.status.normalize() == "active".normalize())
        {
            pagHTML +=
            `
                <tr>
                    <td>${d.designacao}</td>
                    <td>${d.prazo}</td>
                    <td>${d.responsavel}</td>
                    <td>
                    <a href="/tarefas/term/${d.id}"><button class="w3-button w3-green"><i class="fas fa-check"></i></button></a>
                    </td>
                    <td>
                    <a href="/tarefas/canc/${d.id}"><button class="btn"><i class="fa fa-close"></i></button></a>
                    </td>
                    <td></td>
                </tr>
            `
        }
    })

    

    pagHTML +=
    `
            </table>

            <br/>
            <br/>
            <br/>
            <br/>
            
            <table class="w3-table w3-bordered">
            <caption><b>Tarefas terminadas / canceladas</b></caption>
                <tr>
                    <th width="25%">Designação</th>
                    <th width="25%">Data Limite</th>
                    <th width="25%">Responsável</th>
                    <th width="25%">Status</th>
                </tr>
    `

    data.forEach(d => {
        if(d.status.normalize() == "finished".normalize() || d.status.normalize() == "cancelled".normalize())
        {
            pagHTML +=
            `
                <tr>
                    <td>${d.designacao}</td>
                    <td>${d.prazo}</td>
                    <td>${d.responsavel}</td>
                    <td>${d.status}</td>
                </tr>
            `
        }
    })

    pagHTML +=
    `
            </table>
        </body>
    </html>
    `
    
    return pagHTML;
}

// Template para a página de tarefa -------------------------------------
function geraPagTarefa(tarefa)
{
    return `
    <html>
    <head>
        <title>Tarefa: ${tarefa.id}</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Tarefa ${Tarefa.id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Designação: </b> ${tarefa.designacao}</li>
                    <li><b>Data limite: </b> ${tarefa.prazo}</li>
                    <li><b>Responsável: </b> ${tarefa.responsavel}</li>
                    <li><b>Status: </b> ${tarefa.status}</li>
                </ul>
            </div>

            <footer class="w3-container w3-teal">
                <address>[<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}

//servidor stuff

var server = http.createServer(function(req,res) {
    console.log("Chegou pedido: " + req.method + " " + req.url);

    switch(req.method)
    {
        case "GET":
            if((req.url == "/") || (req.url == "/tarefas"))
            {
                axios.get("http://localhost:3000/tarefas?_sort=prazo,responsavel&_order=asc,desc")
                    .then(response => {
                        tarefas = response.data;
                        
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                        res.write(geraMain(tarefas));
                        res.end();
                    }).catch(function(error) {
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possivel dar load à pagina.</p>");
                        res.end();
                    })
            }

            else if(/\/tarefas\/term\/[0-9]+/.test(req.url))
            {
                var id = req.url.split("/")[3];
                axios.get("http://localhost:3000/tarefas/" + id)
                    .then( response => {
                        let t = response.data;

                        try 
                        {
                            axios.put('http://localhost:3000/tarefas/' + id, {
                                id: t.id,
                                designacao: t.designacao,
                                prazo: t.prazo,
                                responsavel: t.responsavel,
                                status: 'finished'

                            });
                            console.log('PUT com sucesso');
                            axios.get("http://localhost:3000/tarefas")
                                .then(response => {
                                    tarefas = response.data;
                        
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                                    res.write(geraMain(tarefas));
                                    res.end();
                                }).catch(function(error) {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                                    res.write("<p>Não foi possivel dar load à pagina.</p>");
                                    res.end();
                                })

                        }catch(err){
                            console.log('Erro no put');
                        }
                        
                        

                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                        res.write("<p>Erro fetching pagina da tarefa.");
                        res.end();
                })

            }

            else if(/\/tarefas\/canc\/[0-9]+/.test(req.url))
            {
                var id = req.url.split("/")[3];
                axios.get("http://localhost:3000/tarefas/" + id)
                    .then( response => {
                        let t = response.data;

                        try 
                        {
                            axios.put('http://localhost:3000/tarefas/' + id, {
                                id: t.id,
                                designacao: t.designacao,
                                prazo: t.prazo,
                                responsavel: t.responsavel,
                                status: 'cancelled'

                            });
                            console.log('PUT com sucesso');
                            axios.get("http://localhost:3000/tarefas")
                                .then(response => {
                                    tarefas = response.data;
                        
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                                    res.write(geraMain(tarefas));
                                    res.end();
                                }).catch(function(error) {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                                    res.write("<p>Não foi possivel dar load à pagina.</p>");
                                    res.end();
                                })

                        }catch(err){
                            console.log('Erro no put');
                        }
                        
                        

                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                        res.write("<p>Erro fetching pagina da tarefa.");
                        res.end();
                })

            }

            else if(((/\/tarefas\/[0-9]+/).test(req.url)))
            {
                var id = req.url.split("/")[2]
                axios.get("http://localhost:3000/tarefas/" + id)
                    .then( response => {
                        let t = response.data;
                
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                        res.write(geraPagTarefa(t));
                        res.end();
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                        res.write("<p>Não foi possível obter a pagina da tarefa...");
                        res.end();
                })
            }

            else if(/w3.css$/.test(req.url)){
                fs.readFile("w3.css", function(erro, dados){
                    if(!erro){
                        res.writeHead(200, {'Content-Type': 'text/css;charset=utf-8'});
                        res.write(dados);
                        res.end();
                    }
                })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>");
                res.end();
            }

            break;

        case "POST":
            if (req.url=='/tarefas')
            {
                recuperaInfo(req,info => {
                    console.log('POST de tarefa: ' + JSON.stringify(info))
                    axios.post('http://localhost:3000/tarefas',info)
                    .then(resp => {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPostConfirm(resp.data))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write('<p>Erro no POST: ' + erro + '</p>')
                        res.write('<p><a href="/">Voltar</a></p>')
                        res.end()
                    })
                })
            }

            else
            {
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>POST " + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            
            break;
            
    }
})

server.listen(7777);
console.log("Server running na porta 7777....");

