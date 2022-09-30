const {db, client} = require("./utils/db");
const {TodoRepository} = require("./repositories/todo.repository");
const {TodoRecord} = require("./records/todo.record");
const express = require('express');
const hbs = require('express-handlebars');
const methodOverride = require('method-override')
const {clientRouter} = require("./routers/client");
const {homeRouter} = require("./routers/home");
const {handleError} = require("./utils/error");

const app = express();

app.use(methodOverride('_method'))
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'))
app.use(express.json())
app.engine('.hbs', hbs.engine({
    extname: '.hbs',
    //helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter)
app.use('/client', clientRouter)

app.use(handleError)

app.listen(3000, 'localhost', ()=>{
    console.log('Listening on http://localhost:3000')
})


// (async() =>{
//
//     try{
//
//         // const todo= await TodoRepository.find('6332fe1a3da67a04849b6f32');
//         //
//         // todo.title = 'sialalalalal';
//         //
//         // await TodoRepository.update(todo)
//         //
//         // console.log(await TodoRepository.find('6332fe1a3da67a04849b6f32'))
//     }
//     finally {
//        //await client.close();
//     }
//
//
// })();


