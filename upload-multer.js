const multer = require('multer');

var Mystorage = multer.diskStorage({
    desination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: Mystorage });

module.exports = upload;