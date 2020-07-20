var express = require('express');
const app = express();
var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');
const {MONGOURI} = require('./keys');
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=>{
    console.log('connected to mongoose');
})
mongoose.set('useCreateIndex', true);


const PORT = 3000;
//G8cqRn86UAzchPqY

app.use(express.json())
require('./models/user');
app.use(require('./routes/auth'));
app.use(require('./routes/post'));


app.get('/',(req,res)=>{
    console.log("ok");
    res.send("hahahaha");
})





app.listen(PORT,()=>{
    console.log("yoo,listening");
});