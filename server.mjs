import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'; 

let todoschema = new mongoose.Schema({
    text: {type: String, required: true},
    classid: String,
    createdon:{ type: Date, default: Date.now}
})
const todoModel = mongoose
const app = express()
const port = process.env.PORT || 3000;

let todos = [];

app.use(express.json());
app.use(cors())

app.post('/todo', (req, res) => {
    
    todos.push(req.body.text);

    todosModel.create({text:req.body.text},(err, saved) =>{
        if(!err) {
            console.log(saved);
            res.send({
            message: "your todo is saved",
            data:todos
            })
        } else {
            res.status(500).send({
                message: "server error",
            })
        }
    }
    })

    res.send({
        message: "your todo is saved",
        data: todos
    })
})
app.get('/todos', (req, res) => {
    
    res.send({
        message: "here is you todo list",
        data: todos
    })
})
app.delete('/del', (req, res) => {
    todos=[]
    res.send({
        message: "todo is deleted",
        data: todos
    })
})

// POST 172.16.18.202:3000/water

// 172.16.18.202:5500

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
var dbURI = "mongodb+srv://basitalu83:*basitali12*@cluster0.zfqei07.mongodb.net/?retryWrites=true&w=majority";
// let dbURI = 'mongodb://localhost/mydatabase';
mongoose.connect(dbURI);
////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
    // process.exit(1);
});
mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
    process.exit(1);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});
process.on('SIGINT', function () {
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});