const express = require('express');
const createError = require("http-errors");
const morgan = require('morgan');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));



app.get('/', async(req, res, next)=>{
    res.send({message : 'Hello World'});
})

app.use('/api', require('./routes/api.route'));


app.use((req, res, next)=>{
    next(createError(404));
});

app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
        error : {
            status : err.status || 500,
            message : err.message
        }
    })
})


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})