/* Multer - модуль для работы с загрузкой картинок */

// модуль Multer и Path (для работы с путями)
const multer = require('multer');
const path = require('path');

// Настройка хранилища multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); //папка, где хранятся все картинки, загружаемые пользователем
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // уникальное имя файла
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // ограничение на размер файла 10MB
});

module.exports = upload;