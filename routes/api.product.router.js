const ketnoi = require('../connect-mysql')
module.exports = function (app) {
    app.get('/api/products', (req, res) => {
        let _limit = req.query._limit;
        _limit = _limit != undefined ? _limit : 4;
        let sql = "SELECT id, name, image, price, sale_price FROM product Order By id DESC LIMIT " + _limit;
        ketnoi.query(sql, (err, data) => {
            let results = [];
            data.forEach(prod => {
                prod.image = 'http://localhost:3000/uploads/' + prod.image,
                    results.push(prod)
            });
            res.send({
                result: data,
                code: 200,
                message: ""
            })
        })
    });
}