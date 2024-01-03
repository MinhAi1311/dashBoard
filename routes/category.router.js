const categoryCtrl = require('../controllers/category.controller')

module.exports = function (app) {
    app.get('/danh-muc', categoryCtrl.index);

    app.get('/xoa-danh-muc/:id', categoryCtrl.delete);

    app.get('/them-danh-muc', categoryCtrl.create);
    app.post('/them-danh-muc', categoryCtrl.store);

    app.get('/sua-danh-muc/:id', categoryCtrl.edit)
    app.post('/sua-danh-muc/:id', categoryCtrl.update);
}