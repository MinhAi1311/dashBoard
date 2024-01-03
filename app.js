const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sessionStorage = require('node-sessionstorage');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
app.use(express.static('public'));

require('./routes/login.router')(app);
app.use(function (req, res, next) {
    let accountJson = sessionStorage.getItem('admin_login');
    if (accountJson) {
        global.account = JSON.parse(accountJson);
        next();
    } else {
        res.redirect('/login');
    }
});

require('./routes/home.router')(app);

require('./routes/category.router')(app);
require('./routes/product.router')(app);
require('./routes/api.product.router')(app);
require('./routes/api.category.router')(app);
require('./routes/api.account.router')(app);

app.listen(PORT, function () {
    console.log('Server run on http://localhost:' + PORT)
})