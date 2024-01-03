const ketnoi = require('../connect-mysql')
const util = require('node:util');
const query = util.promisify(ketnoi.query).bind(ketnoi);

const Category = require('../models/category.model')

exports.index = async function (req, res) {

    Category.getAll(req, function (err, data, totalPage, _page, _name) {
        res.render('category', {
            title: 'Quản lý danh mục',
            data: data ? data : [],
            totalPage: totalPage,
            _page: parseInt(_page),
            _name: _name
        });
    })

}

exports.delete = function (req, res) {
    let id = req.params.id;
    Category.delete(id, function (err, data) {
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
    res.render('category-add');
}

exports.store = (req, res) => {
    let bodyData = req.body;
    Category.store(bodyData, function (err, data) {
        if (err) {
            res.render('error', {
                message: err.msg,
                code: err.errno
            });
        } else {
            res.redirect('/danh-muc')
        }
    });
}

exports.edit = (req, res) => {
    let id = req.params.id;
    Category.getOne(id, function (err, data) {
        if (err) {
            res.render('error', {
                message: err.msg,
                code: err.errno
            });
        } else {
            res.render('category-edit', {
                cat: data
            });
        }
    })
}

exports.update = async (req, res) => {
    Category.update(req, function (err, data) {
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