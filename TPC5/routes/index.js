var express = require('express');
var router = express.Router();
var Task = require('../controllers/task')
var User = require('../controllers/user')


/* GET home page. */
router.get('/', function(req, res, next) {
  Task.getTasks().then(_tasks => {
    var maxTaskID = 0
    for(let i = 0; i < _tasks.length; i++){
      if(parseInt(_tasks[i].id) > maxTaskID) maxTaskID = parseInt(_tasks[i].id)
    }
    maxTaskID++

    User.getUsers().then(_users => {
      var maxUserID = 0
        for(let i = 0; i < _users.length; i++){
          if(parseInt(_users[i].id) > maxUserID) maxUserID = parseInt(_users[i].id)
        }
      maxUserID++ 
      
      res.render('index', {tasks: _tasks, users: _users, maxTask: maxTaskID, maxUser: maxUserID})
    }).catch(erro => {
      res.render('error', {error: erro, message: "Não foi possível obter a lista de utilizadores"})
    })
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Não foi possível obter a lista de tarefas"})
  })
});

/* Get edit task page*/
router.route('/tasks/edit/:id').get(function(req,res,next) {
  Task.getTask(req.params.id)
    .then(t => {
      
      User.getUsers().then(u => {    
        res.render('edit', {task: t, users: u});
      }).catch(erro =>{
        res.render('error', {error: erro, message: "Não foi possível obter a lista de utilizadores"})
      })
      
    })
    .catch(erro =>{
      res.render('error', {error: erro, message: "Não foi possível obter tarefa"})
    })
  
}).post(function(req,res,next) {
  Task.editTask(req.body).then(task => {
    res.redirect('/')
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Não foi possível atualizar a tarefa"})
  })
});

router.get('/tasks/delete/:id', function(req,res,next) {
    Task.deleteTask(req.params.id)
    .then(task =>{
      res.redirect('/');
    })
    .catch(erro =>{
      res.render('error', {error: erro, message: "Não foi possível obter a tarefa"})
    })
})

router.get('/tasks/done/:id', function(req,res,next) {
  Task.getTask(req.params.id).then(task =>{
    Task.checkTask(task).then(task => {
      res.redirect('/');
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Não foi possível completar a tarefa"})
    })
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Não foi possível obter a tarefa"})
  })
})

router.post('/tasks/registo', function(req,res,next) {
  Task.addTask(req.body)
  .then(task =>{
    res.redirect('/');
  })
  .catch(erro =>{
    res.render('error', {error: erro, message: "Não foi possível adicionar a tarefa"})
  })
})

router.post('/users/registo', function(req,res,next) {
  User.addUser(req.body)
  .then(user =>{
    res.redirect('/');
  })
  .catch(erro =>{
    res.render('error', {error: erro, message: "Não foi possível adicionar o utilizador"})
  })
})


module.exports = router;

/* GET edit page. */