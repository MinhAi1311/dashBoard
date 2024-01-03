const ketnoi = require('../connect-mysql');
const sessionStorage = require('node-sessionstorage');

module.exports = function (app) {
    app.get('/login', (req, res) => {
        res.render('login', {
            err_msg: ''
        });
    });
    app.get('/logout', (req, res) => {
        sessionStorage.removeItem('admin_login');
        res.redirect('/login');
    });

    app.post('/login', (req, res) => {
        let sql = "SELECT id, name, email FROM account WHERE email = ? AND password = ? AND role = 'admin'";
        ketnoi.query(sql, [req.body.email, req.body.password], (err, data) => {
            if (err || data.length == 0) {
                res.render('login', {
                    err_msg: 'Tài khoản hoặc mật khẩu không chính xác!'
                })
            } else {
                let accountJson = JSON.stringify(data[0]);
                sessionStorage.setItem('admin_login', accountJson);
                res.redirect('/');
            }
        })
    });
}