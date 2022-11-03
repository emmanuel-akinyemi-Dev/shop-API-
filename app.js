const express = require('express');
const app = express();
const productRoute = require('./api/routes/products') ;
const orderRoute = require('./api/routes/orders')
const morgan = require('morgan')
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const Uri = 'mongodb://127.0.0.1:27017/shop1'
 
mongoose.connect(Uri);

app.use( morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


//   app.use((req, res, next)=>{
//      res.header("Access-Control-Allow-Origin" ,  "*") ;
//      res.header("Access-Control-Allow_Headers", 'Origin, X-requested-With, Content-Type, Authorization') ;

//       if (req.method === 'OPTIONS'){
//           res.header('Access-Control-Allow-Methods ', 'PUT, POST, PATCH, GET, DELETE');
//          res.status(200).json({});
//      }
//    });




app.use('/products', productRoute);
app.use( '/orders', orderRoute);

app.use((req, res, next)=>{
    const error = new Error('not found');
    error.status = 404;
    next(error);
 }); 

 app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
 });




module.exports = app; 