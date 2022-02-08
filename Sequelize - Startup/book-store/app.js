const express = require('express');
const cors = require('cors');

const {sequelize}=require('./models');
const BookRoute = require('./routes/booksRoute');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors);

//Routes
app.use('/db/v1/books',BookRoute);

app.use((errMsg,req,res,next)=>{
    const err = new Error(errMsg);
    err.status = 404;
    next(err);
});

app.use((errMsg,req,res,next)=>{
    res.status(errMsg.status || 500);
    res.json({
        error:{
            message:errMsg.message
        }
    })
});

sequelize.sync().then(()=>{
     const server =app.listen(port,()=>{
        console.log("Listening on port " + port);
     })
});