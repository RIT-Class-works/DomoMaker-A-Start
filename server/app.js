//setup server and listen for port

const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');

// *10 Part 1

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURL = process.env.MONGODB || 'mongodb://localhost/DomoMaker';

mongoose.connect(dbURL, (err) =>{
    if(err){
        console.log('Could not connect to database');
        throw err;
    }
});

const router = require('./router.js');
const { ExpressHandlebars } = require('express-handlebars');

const app = express();
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
app.use(favicon(`${__dirname}/../hosted/image/favicon.png`));
app.use(compression());
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.engine('handlebars', expressHandlebars({defaultLayout: 'Main'}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(cookieParser());

router(app);

app.listen(port, (err) =>{
    if(err){
        throw err;
    }
    console.log(`listening on port ${port}`);
});


//*12 start up server
