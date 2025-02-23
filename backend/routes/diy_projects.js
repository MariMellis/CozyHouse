const express = require('express');
const jwt = require('jsonwebtoken');
const DIY_Project = require('../models/DIY_Project');
const User = require('../models/User');
const auth = require('../middleware/auth');
const upload = require('../config/multer');
const router = express.Router();

// Получение всех проектов в формате JSON
router.get('/', async (req, res) => {
  try {
    const diy_projects = await DIY_Project.find().populate('user', 'username');
    res.json(diy_projects);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Маршрут для получения количества проектов
router.get('/count', async (req, res) => {
  try {
    const count = await DIY_Project.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error(error); // Логирование ошибки на сервере
    res.status(500).json({ error: 'Ошибка при получении количества проектов!' });
  }
});

// Получение деталей проекта
router.get('/:id', async (req, res) => {
  try {
    const diy_project = await DIY_Project.findById(req.params.id);
    if (!diy_project) {
      return res.status(404).send('Проект не найден!');
    }
    res.json(diy_project);
  } catch (error) {
    res.status(500).send('Ошибка сервера');
  }
});

// Добавление нового проекта
router.post('/', auth, upload.single('image'), async (req, res) => {
  const { title, instructions, description, difficulty } = req.body;

  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден!' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    console.log('тот URL, куда сохранена картинка:', imageUrl);
    const diy_project = new DIY_Project({ title, instructions, user: req.user, username: user.username, difficulty, description, imageUrl });
    console.log('Отладочный вывод:', imageUrl); // Отладочный вывод URL картинки
    await diy_project.save();
    res.status(201).json(diy_project);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;