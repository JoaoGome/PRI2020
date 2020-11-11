var http = require('http')
const axios = require('axios');


var servidor = http.createServer(function(req,res) {

    if(req.method == 'GET')
    {
        if(req.url == '/')
        {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })

            res.write('<h2>Escola de Música</h2>');
            res.write('<ul>');
            res.write('<li> <a href="http://localhost:3001/alunos">Lista de alunos </li>');
            res.write('<li> <a href="http://localhost:3001/cursos">Lista de cursos </li>');
            res.write('<li> <a href="http://localhost:3001/instrumentos">Lista de instrumentos </li>');
            res.write('</ul>');
            res.end();
            
        }

        else if (req.url == '/alunos') 
        {

            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })

            axios.get('http://localhost:3000/alunos')
                .then(resp => {
                    alunos = resp.data;
                    res.write('<ul>');
                    alunos.forEach(a => {
                        res.write(`<li><a href="http://localhost:3001/alunos/${a.id}">${a.nome}</a></li>`);
                    
                    });
                    res.write('</ul>');
                    console.log("Lista de alunos entregue");
                    res.write('<a href="http://localhost:3001/">Voltar ao Índice</a>');
                    res.end();
                
                }).catch(error => {
                    console.log('ERRO: ' + error);
                    res.write('<p> Falha a obter a lista de alunos... </p>');
                    res.end();
                    
                })
        }

        else if (req.url.match(/\/alunos\/[A-Z][0-9]+/))
        {
            var id = req.url.split("/")[2];
            
            axios.get('http://localhost:3000/alunos/' + id)
                .then(resp => {
                    aluno = resp.data;

                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8'
                    })

                    res.write(`<p>Id: ${aluno.id}</p>`);
                    res.write(`<p>Nome: ${aluno.nome}</p>`);
                    res.write(`<p>Data_Nascimento: ${aluno.dataNasc}</p>`);
                    res.write(`<p>Curso: ${aluno.curso}</p>`);
                    res.write(`<p>Ano_Curso: ${aluno.anoCurso}</p>`);
                    res.write(`<p>Instrumento: ${aluno.instrumento}</p>`);

                    console.log("Aluno entregue");
                    res.write('<a href="http://localhost:3001/alunos">Voltar atrás</a>');
                    res.end();

                }).catch(error => {
                    console.log('ERRO: ' + error);
                    res.write('<p> Falha a entregar informação do aluno</p>');
                    res.end();
                });

        }

        else if (req.url == "/cursos")
        {

            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })

            axios.get('http://localhost:3000/cursos')
                .then(resp => {
                    cursos = resp.data;
                    res.write('<ul>');
                    cursos.forEach(c => {
                        res.write(`<li><a href="http://localhost:3001/cursos/${c.id}">${c.id}</a></li>`);
                    });

                    res.write('</ul>');
                    console.log("Lista de cursos entregue");
                    res.write('<a href="http://localhost:3001/">Voltar ao Índice</a>');
                    res.end();
                }).catch(error => {
                    console.log("ERRO: " +  error);
                    res.write('<p> Falha a obter a lista de cursos...</p>');
                    res.end();
                })
        }
        
        else if (req.url.match(/\/cursos\/[A-Z]+[0-9]+/))
        {
            var id = req.url.split("/")[2];
            
            axios.get('http://localhost:3000/cursos/' + id)
                .then(resp => {
                    curso = resp.data;

                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8'
                    })

                    res.write(`<p>Id: ${curso.id}</p>`);
                    res.write(`<p>Designação: ${curso.designacao}</p>`);
                    res.write(`<p>Duração: ${curso.duracao}</p>`);
                    res.write(`<p>Instrumento Id: ${curso.instrumento.id}</p>`);

                    console.log("Curso entregue");
                    res.write('<a href="http://localhost:3001/cursos">Voltar atrás</a>');
                    res.end();

                }).catch(error => {
                    console.log('ERRO: ' + error);
                    res.write('<p> Falha a entregar informação do curso</p>');
                    res.end();
                });

        }

        else if (req.url == "/instrumentos")
        {

            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })

            axios.get('http://localhost:3000/instrumentos')
                .then(resp => {
                    instrumentos = resp.data;
                    res.write('<ul>');
                    instrumentos.forEach(i => {
                        res.write(`<li><a href="http://localhost:3001/instrumentos/${i.id}">${i.id}</a></li>`);
                    });

                    res.write('</ul>');
                    console.log("Lista de instrumentos entregue");
                    res.write('<a href="http://localhost:3001/">Voltar ao Índice</a>');
                    res.end();
                }).catch(error => {
                    console.log("ERRO: " +  error);
                    res.write('<p> Falha a obter a lista de instrumentos...</p>');
                    res.end();
                })
        }

        else if (req.url.match(/\/instrumentos\/[A-Z][0-9]+/))
        {
            
            var id = req.url.split("/")[2];
            
            axios.get('http://localhost:3000/instrumentos/' + id)
                .then(resp => {
                    instrumento = resp.data;

                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8'
                    })

                    res.write(`<p>Id: ${instrumento.id}</p>`);
                    res.write(`<p>Text: ${instrumento["#text"]}</p>`);

                    console.log("Instrumento entregue");
                    res.write('<a href="http://localhost:3001/instrumentos">Voltar atrás</a>');
                    res.end();

                }).catch(error => {
                    console.log('ERRO: ' + error);
                    res.write('<p> Falha a entregar informação do instrumento</p>');
                    res.end();
                });

        }

    }

    
    else 
    {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write('<p>Pedido não suportado: ' + req.method + '</p>');
        res.end();
    }
})


servidor.listen(3001);
console.log("Listening na porta 3001...");

