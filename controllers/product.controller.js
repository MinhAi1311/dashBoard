const ketnoi = require('../connect-mysql')
const util = require('node:util');
const query = util.promisify(ketnoi.query).bind(ketnoi);

const Product = require('../models/product.model')
const Category = require('../models/category.model');

exports.index = async function (req, res) {

    Product.getAll(req, function (err, data, totalPage, _page, _name) {
        res.render('product', {
            data: data ? data : [],
            totalPage: totalPage,
            _page: parseInt(_page),
            _name: _name
        });
    })

}

exports.delete = function (req, res) {
    let id = req.params.id;
    Product.delete(id, function (err, data) {
        if (err) {
            res.render('error', {
                message: err.msg,
                code: err.errno
            });
        } else {
            res.redirect('/danh-muc')
        }
    })
}

exports.create = (req, res) => {
    Category.dataComboBox(function (err, cats) {
        res.render('product-add', {
            cats: cats.length ? cats : []
        });
    });

}

exports.store = (req, res) => {
    let bodyData = req.body;
    bodyData.image = req.file.filename;
    Product.store(bodyData, function (err, data) {
        if (err) {
            res.render('error', {
                message: err.msg,
                code: err.errno
            });
        } else {
            res.redirect('/san-pham')
        }
    });
}

exports.edit = async (req, res) => {
    let id = req.params.id;
    let sql_cats = "SELECT id, name FROM category order by name asc";
    let queryCat = await query(sql_cats);

    Product.getOne(id, function (err, data) {
        if (err) {
            res.render('error', {
                message: err.msg,
                code: err.errno
            });
        } else {
            res.render('product-edit', {
                product: data,
                cats: queryCat
            });
        }
    });
}

exports.update = async (req, res) => {
    Product.update(req, function (err, data) {
        if (err) {
            res.render('error', {
                message: err.msg,
                code: err.errno
            });
        } else {
            res.redirect('/san-pham')
        }
    })
}