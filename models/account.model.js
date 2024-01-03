const ketnoi = require('../connect-mysql')
const util = require('node:util');
const query = util.promisify(ketnoi.query).bind(ketnoi);

const Account = function () { }

Account.getAll = function (myFun) {
    let sql = "SELECT * FROM account Order By id DESC";
    ketnoi.query(sql, (err, result) => {
        myFun(err, result);
    })
}

Account.getOne = function (id, myFun) {
    let sql = "SELECT * FROM account WHERE id = ?";
    ketnoi.query(sql, [id], (err, result) => {
        let data = result.length > 0 ? result[0] : "";
        myFun(err, data);
    })
}

Account.store = function (body, myFun) {
    let sql = "INSERT INTO account SET ?";
    ketnoi.query(sql, body, (err, data) => {
        body.id = data.insertId;
        myFun(err, body);
    })
}

Account.update = function (body, myFun) {
    let sql = "UPDATE account SET ? WHERE id = ?";
    ketnoi.query(sql, [body, body.id], async (err, data) => {
        let acc = await query("SELECT * FROM account WHERE id = ?", [body.id]);
        let data1 = acc.length > 0 ? acc[0] : "";
        myFun(err, data1);
    })
}

Account.delete = async function (id, myFun) {
    let acc = await query("SELECT * FROM account WHERE id = ?", [id]);
    let sql = "DELETE FROM account WHERE id = ?";
    ketnoi.query(sql, [id], (err, result) => {
        let data = acc.length > 0 ? acc[0] : "";
        myFun(err, data);
    })
}

Account.checklogin = function (body, myFun) {
    let sql = "SELECT * FROM account WHERE email = ? AND password = ?";
    ketnoi.query(sql, [body.email, body.password], (err, result) => {
        let data = result.length > 0 ? result[0] : "";
        myFun(err, data);
    })
}
module.exports = Account;