const categoryCtrl = require('../controllers/api.category.controller')
module.exports = function (app) {
    app.get('/api/danh-muc', categoryCtrl.index);
    app.post('/api/danh-muc', categoryCtrl.store);
    app.delete('/api/danh-muc/:id', categoryCtrl.delete);
    app.get('/api/danh-muc/:id', categoryCtrl.edit);
    app.put('/api/danh-muc/:id', categoryCtrl.update);
}