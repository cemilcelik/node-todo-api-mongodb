const { Todo } = require('../models/todo');

const TodoController = {
    get: (req, res) => {
        Todo.find().then((todos) => {
            res.send(todos);
        }, (e) => {
            res.status(400).send(e);
        })
    },
    post: (req, res) => {
        let todo = new Todo();
        todo.title = req.body.title;
        todo.save().then((doc) => {
            res.send(doc);
        }, (e) => {
            res.status(400).send(e);
        });
    },
    patch: (req, res) => {
        let id = req.params.id;
    
        let body = _.pick(req.body, ['title', 'completed']);
    
        if ( ! ObjectId.isValid(id)) {
            return res.send('Id is not valid.');
        }
    
        if (body.completed) {
            body.completedAt = new Date().getTime();
        }else{
            body.completed = false;
            body.completedAt = null;
        }
        
        Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
            if ( ! todo) {
                return res.status(404).send('Record not found.');
            }
            res.send(todo);
        }, (e) => {
            res.status(400).send(e)
        })
    },
    delete: (req, res) => {
        let id = req.params.id;
    
        if ( ! ObjectId.isValid(id)) {
            return res.status(400).send('ID is not valid.');
        }
    
        Todo.findByIdAndRemove(id).then((todo) => {
            if ( ! todo) {
                return res.status(404).send('Record not found.');
            }
            res.send(todo);
        }, (e) => {
            res.status(400).send(e)
        });
    },
    getById: (req, res) => {
        let id = req.params.id;
    
        if ( ! ObjectId.isValid(id)) {
            return res.status(400).send('ID is not valid.');
        }
    
        Todo.findById(id).then((todo) => {
            if ( ! todo) {
                return res.status(404).send('Record not found.');
            }
    
            res.send(todo);
        }, (e) => {
            res.status(400).send(e);
        });
    }
}

module.exports = { TodoController }