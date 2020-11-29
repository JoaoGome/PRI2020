var Aluno = require('../models/aluno')

// Devolve a lista de alunos
module.exports.listar = () => {
    return Aluno.find().exec();
}

module.exports.consultar = numero => {
    return Aluno   
        .findOne({Número:numero})
        .exec()
}

module.exports.inserir = a => {
    var novo = new Aluno(a)
    return novo.save()
} 

module.exports.atualizar = a => {
    return Aluno.updateOne(
        {"Número": a.Número},
        {"$set": {"Número": a.Número, 
                  "Nome":a.Nome, 
                  "Git":a.Git, 
                  "tpc":a.tpc
                 }
        })
}

module.exports.eliminar = a => {
    return Aluno.deleteOne({"Número": a.Número})
}