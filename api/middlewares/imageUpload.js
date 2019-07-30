const multer = require('multer');
const mkdirp = require('mkdirp');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './public/images/uploads';
        mkdirp(dir, err => cb(err, dir))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

var upload = multer({ storage: storage });

module.exports = upload.single('image');