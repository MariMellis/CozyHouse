// uploadRoutes.js - обновление маршрутов

const express = require('express'); // модуль для работы с фреймворком Express.js (для backend)
const router = express.Router(); // маршрутизатор
const multer = require('multer'); // модуль Multer (загрузка картинок)
const path = require('path'); // модуль Path (для работы с путями)

// Настройка хранилища multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../uploads/'); // путь к папке
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // уникальное имя файла
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // ограничение на размер
});

const DIY_Project = require('../models/DIY_Project'); // модель "DIY-проект"
const User = require('../models/User'); // модель "Пользователь"
const auth = require('../middleware/auth'); // "middleware"

// Добавление нового проекта с загрузкой изображения
router.post('/diy_projects', auth, upload.single('image'), async (req, res) => {
    const { title, instructions, description, difficulty } = req.body;

    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const diy_project = new DIY_Project({
            title,
            instructions,
            description,
            difficulty,
            user: req.user,
            username: user.username,
            imageUrl
        });

        await diy_project.save();
        res.status(201).json(diy_project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;