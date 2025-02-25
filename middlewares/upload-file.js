const multer = require('multer');
const path = require('path');

// variable dimana file akan disimpan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(
            null, './uploads');
    },
    filename: (req, file, cb) => {
        const suffix = Date.now() + '_' + Math.round(Math.random() * 100);
        cb(
            null, 
            '/' + file.fieldname + "-" + suffix + path.extname(file.originalname)
        );
    },
});
const upload = multer({ storage: storage });

module.exports = upload;