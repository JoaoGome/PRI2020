var express = require('express');
var router = express.Router();
var methodOverride = require('method-override')

const Aluno = require('../controllers/aluno');
const aluno = require('../models/aluno');

router.use(methodOverride("_method"))

// GET
router.get('/', function(req, res, next) {
    res.render('main', { modo: "index", title: 'Turma PRI de 2020' });
});

router.get('/alunos',(req,res) => {
    Aluno.listar()
      .then(dados => res.render('main', {lista:dados, modo:"alunos"}))
      .catch(e => res.render('main',{modo:"erro",error:e}))
    
})



router.get('/alunos/registar', (req,res) => {
    res.render('main',{modo:"registo"})
})

router.get('/alunos/editar/:id',(req,res) => {
    Aluno.consultar(req.params.id)
      .then(dados => res.render('main', {lista:dados, modo:"editar"}))
      .catch(e => res.render('main',{modo:"erro",error:e}))
})

router.get('/alunos/:id',(req,res) => {
    Aluno.consultar(req.params.id)
      .then(dados => res.render('main', {lista:dados, modo:"aluno"}))
      .catch(e => res.render('main',{modo:"erro",error:e}))
})


// POST
router.post('/alunos',(req,res) => {
    var sub_strings = req.body.tpc.split(',')
    var numbers = []
    sub_strings.forEach(element => {
      var number = parseInt(element)
      numbers.push(number)
    });

    req.body.tpc = numbers.slice()


    Aluno.inserir(req.body)
      .then(res.render('main', {lista:req.body,modo:"aluno"}))
      .catch(e => res.render('main',{modo:"erro",error:e}))
    
})

//PUT

router.put('/alunos', (req, res) => {

    var sub_strings = req.body.tpc.split(',')
      var numbers = []
      sub_strings.forEach(element => {
        var number = parseInt(element)
        numbers.push(number)
      });

    req.body.tpc = numbers.slice()
  

    Aluno.atualizar(req.body)
      .then(res.render('main', {lista:req.body, modo:"aluno"}))
      .catch(e => res.render('main',{modo:"erro",error:e}))
})

//DELETE

/* DELETE */
router.delete('/alunos', (req, res) => {

    Aluno.eliminar(req.body)
      .then(res.render('main', {modo:"apagado"}))
      .catch(e => res.render('main',{modo:"erro",error:e}))
})




module.exports = router;
