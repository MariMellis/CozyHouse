/* Маршруты запросов к серверу для работы с DIY-проектами */

const express = require('express'); // модуль для работы с фреймворком Express.js (для backend)
const jwt = require('jsonwebtoken'); // работа с токенами
const DIY_Project = require('../models/DIY_Project'); // модель "DIY-проект"
const User = require('../models/User'); // модель "Пользователь"
const auth = require('../middleware/auth'); // "middleware"
const upload = require('../config/multer'); // файл конфигурации multer.js
const router = express.Router(); // маршрутизатор


// Получение всех проектов в формате JSON (отправка GET-запроса на сервер)
router.get('/', async (req, res) => {
  try {
    const diy_projects = await DIY_Project.find().populate('user', 'username');
    res.json(diy_projects);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Маршрут для получения количества проектов в БД (отправка GET-запроса на сервер)
router.get('/count', async (req, res) => {
  try {
    const count = await DIY_Project.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error(error); // Логирование ошибки на сервере
    res.status(500).json({ error: 'Ошибка при получении количества проектов' });
  }
});

// Получение детального описания проекта по ID (отправка GET-запроса на сервер)
router.get('/:id', async (req, res) => {
  try {
    const diy_project = await DIY_Project.findById(req.params.id);
    if (!diy_project) {
      return res.status(404).send('Эксперимент не найден');
    }
    res.json(diy_project);
  } catch (error) {
    res.status(500).send('Ошибка сервера');
  }
});

// Добавление нового проекта (отправка POST-запроса на сервер)
router.post('/', auth, upload.single('image'), async (req, res) => {
  const { title, instructions, description, difficulty } = req.body;

  try {
    const user = await User.findById(req.user);
    // проверка на наличие пользователя
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // загрузка картинки, логирование, сохранение проекта
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    console.log('Image URL to be saved:', imageUrl);
    const diy_project = new DIY_Project({ title, instructions, user: req.user, username: user.username, difficulty, description, imageUrl });
    console.log('Uploaded file path:', imageUrl); // Отладочный вывод
    await diy_project.save();
    res.status(201).json(diy_project);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;