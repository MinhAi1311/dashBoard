const accountCtrl = require('../controllers/api.account.controller')
module.exports = function (app) {
    app.get('/api/account', accountCtrl.index);
    app.post('/api/account', accountCtrl.create);
    app.get('/api/account/:id', accountCtrl.getOne);
    app.put('/api/account/:id', accountCtrl.update);
    app.post('/api/account/login', accountCtrl.login);
}