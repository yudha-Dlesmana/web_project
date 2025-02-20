const multer = require('multer');
const path = require('path');

// variable dimana file akan disimpan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(
            null, 
            path.join(__dirname, '../uploads')
        );
    },
    filename: (req, file, cb) => {
        const suffix = Date.now() + '_' + Math.random(Math.random() * 100);
        cb(
            null, 
            file.fieldname + "-" + suffix + path.extname(file.originalname)
        );
    },
});
const upload = multer({ storage: storage });

module.exports = upload;