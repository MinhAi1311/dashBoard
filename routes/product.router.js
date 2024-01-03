const productCtrl = require('../controllers/product.controller');
const upload = require('../upload-multer');

module.exports = function (app) {
    app.get('/san-pham', productCtrl.index);

    app.get('/xoa-san-pham/:id', productCtrl.delete);

    app.get('/them-san-pham', productCtrl.create);
    app.post('/them-san-pham', upload.single('image'), productCtrl.store);

    app.get('/sua-san-pham/:id', productCtrl.edit)
    app.post('/sua-san-pham/:id',upload.single('image'), productCtrl.update);
}