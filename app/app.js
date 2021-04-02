const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
// set the view engine to use handlebars
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Chess App',
        page_title: 'Chess'
    });
});

module.exports = app;