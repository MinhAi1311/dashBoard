const ketnoi = require('../connect-mysql')
const util = require('node:util');
const query = util.promisify(ketnoi.query).bind(ketnoi);

const Product = function () { }

Product.getAll = async function (req, callback) {
    let _name = req.query.name;
    let _page = req.query.page ? req.query.page : 1;

    let _sql_total = "SELECT COUNT(*) as total FROM product";

    if (_name) {
        _sql_total += " WHERE name LIKE '%" + _name + "%'"
    }
    let rowData = await query(_sql_total);
    let totalRow = rowData[0].total;

    let _limit = 5;
    let totalPage = Math.ceil(totalRow / _limit);
    _page = _page > 0 ? Math.floor(_page) : 1;
    _page = _page <= totalPage ? Math.floor(_page) : totalPage;

    let _start = (_page - 1) * _limit;

    let sql = "SELECT p.*, c.name as cname FROM product p JOIN category c ON p.category_id = c.id";
    if (_name) {
        sql += " WHERE name LIKE '%" + _name + "%'"
    }
    sql += " order by id DESC LIMIT " + _start + "," + _limit;
    ketnoi.query(sql, function (err, data) {
        callback(err, data, totalPage, _page, _name);
    })
}

Product.delete = function (id, myFun) {
    let sql_delete = "DELETE FROM product WHERE id = ?";
    ketnoi.query(sql_delete, [id], function (err, data) {
        if (err) {
            let msg = '';
            myFun({ msg, errno: err.errno }, null);
        } else {
            myFun(false, data);
        }
    });
}

Product.store = function (bodyData, myFun) {
    let sql = "INSERT INTO product SET ?";
    ketnoi.query(sql, bodyData, (err, data) => {
        if (err) {
            myFun({ msg, errno: err.errno }, null);
        } else {
            myFun(false, data);
        }
    })
}

Product.getOne = function (id, myFun) {
    ketnoi.query("SELECT * FROM product WHERE id = ?", [id], (err, data) => {

        if (data.length) {
            myFun(false, data[0])
        } else {
            myFun({ msg: 'Không tìm thấy dữ liệu', errno: 404 }, null)
        }
    })
}

Product.update = function (req, myFun) {
    let id = req.params.id;
    if (req.file || req.file != undefined) {
        req.body.image = req.file.filename;
    }
    let sql = "UPDATE product SET ? WHERE id = ?";
    ketnoi.query(sql, [req.body, id], (err, data) => {
        if (err) {
            myFun({ msg, errno: err.errno }, null);
        } else {
            myFun(false, data);
        }
    })
}
module.exports = Product;