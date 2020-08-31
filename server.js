const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db')
// load env vars 
dotenv.config({path:'./config/config.env'});

// connect to dtabase
// middleware executes in linear order 
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');
const app = express();

app.use(express.json());
 
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
app.use(morgan('dev'));

//app.use(logger);


// Mount routers 
app.use('/api/v1/bootcamps',bootcamps);

app.use(errorHandler);

const PORT= process.env.PORT || 5000;


const server= app.listen(PORT ,console.log(`server listenig in ${process.env.NODE_ENV} ON PORT NO ${PORT}`.yellow));

// handle unhandle promise rjection 

process.on('unhandledRejection',(err,promise)=>{
    console.log(`error : ${err.message}`);

    // close derve r exit process 

    server.close(()=>process.exit(1));
})


     