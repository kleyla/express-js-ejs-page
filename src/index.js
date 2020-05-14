
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/express-pagination', {
    // useMongoClient: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log('db is conected!'))
.catch( err => console.log(err))

const indexRoutes = require('./routes/index');
//SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
//MIDLEWARE
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//ROUTES
app.use(indexRoutes)
//STATIC FILES

app.listen( app.get('port'), () => {
    console.log('Server on port ', app.get('port'))
})

