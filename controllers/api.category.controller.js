const ketnoi = require('../connect-mysql')
const util = require('node:util');
const query = util.promisify(ketnoi.query).bind(ketnoi);

const Category = require('../models/category.model')

exports.index = async function (req, res) {

    Category.getAll(req, function (err, data, totalPage, _page, _name) {
        res.send({
            result: data ? data : [],
            message: "",
            code: 200,
            totalPage: totalPage,
            _page: parseInt(_page),
            _name: _name
        });
    })

}

exports.delete = function (req, res) {
    let id = req.params.id;
    Category.getOne(id, function (err, data) {
        if (err) {
            res.send({
                result: "",
                message: err.msg,
                code: 200
            });
        } else {
            Category.delete(id, function (err, data) {
                if (err) {
                    res.send({
                        result: "",
                        message: err.msg,
                        code: 200
                    });
                } else {
                    res.send({
                        result: data,
                        message: 'xoa thanh cong',
                        code: 200
                    });
                }
            })
        }
    });
}

exports.store = (req, res) => {
    let bodyData = req.body;
    Category.store(bodyData, function (err, data) {
        if (err) {
            res.send({
                result: "",
                message: err.msg,
                code: err.msg
            });
        } else {
            req.body.id = data.insertId;
            res.send({
                result: req.body,
                message: 'them thanh cong',
                code: 200
            });
        }
    });
}

exports.edit = (req, res) => {
    let id = req.params.id;
    Category.getOne(id, function (err, data) {
        if (err) {
            res.send({
                result: "",
                message: err.msg,
                code: 200
            });
        } else {
            res.send({
                result: data,
                message: '',
                code: 200
            });
        }
    })
}

exports.update = async (req, res) => {
    Category.getOne(req.params.id, function (err, data) {
        if (err) {
            res.send({
                result: "",
                message: err.msg,
                code: 200
            });
        } else {
            Category.update(req, function (err, data) {
                if (err) {
                    res.send({
                        result: "",
                        message: err.msg,
                        code: err.errno
                    });
                } else {
                    req.body.id = req.params.id;
                    res.send({
                        result: req.body,
                        message: 'cap nhat thanh cong',
                        code: 200
                    });
                }
            })
        }
    })
}