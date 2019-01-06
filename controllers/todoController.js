var bodyparser = require('body-parser')
var urlencodedparser = bodyparser.urlencoded({extended: false})
var mongoose = require('mongoose')

mongoose.connect('mongodb://stt888:stt888@ds145981.mlab.com:45981/todo')

var todolistSchema = new mongoose.Schema({
    item: String
})

var todolist = mongoose.model('todolist', todolistSchema)

// var todolist = [{item:'dance'}, {item:'singing'}, {item:'shopping'}]

module.exports = function(app){
    app.get('/todo', function(req, res){
        todolist.find({}, function(err, data){
            if(err) throw err
            res.render('todo', {todos: data})
        })
    })

    app.post('/todo', urlencodedparser, function(req, res){
        todolist(req.body).save(function(err, data){
            if(err) throw err
            res.json(data)
        })
    })

    app.delete('/todo/:item', function(req, res){
        todolist.find({item: req.params.item.replace(/ /g, "-")}).remove(function(err, data){
            if(err) throw err
            res.json(data)
        })
        // todolist = todolist.filter(function(todo){
        //     return todo.item.replace(/ /g, "-")!==req.params.item
        // })
    })
}