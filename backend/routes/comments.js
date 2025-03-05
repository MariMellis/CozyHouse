/* Маршруты запросов к серверу для работы с комментариями */

const express = require('express'); // модуль для работы с фреймворком Express.js (для backend)
const router = express.Router(); // маршрутизатор
const DIY_Project = require('../models/DIY_Project'); // модель "DIY-проект"
const User = require('../models/User'); // модель "Пользователь"
const auth = require('../middleware/auth'); // "middleware"

// Отправка комментария (отправка POST-запроса на сервер)
router.post('/:diy_projectId/comments', auth, async (req, res) => {
    const { diy_projectId } = req.params;
    const { text } = req.body;

    // проверка на существование DIY-проекта
    try {
        const diy_project = await DIY_Project.findById(diy_projectId);
        if (!diy_project) {
            console.log('diy_project не найден');
            return res.status(404).json({ message: 'diy_project не найден' });
        }

        // ведение логов на стороне сервера (полезно для отладки)
        console.log('diy_project найден:', diy_project);
        console.log('User ID из auth middleware:', req.user);
        
        // проверка на наличие пользователя
        const user = await User.findById(req.user); // Извлекаем пользователя по ID
        if (!user) {
            console.log('Пользователь не найден');
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        console.log('Пользователь найден:', user);

        const comment = {
            user: req.user._id,
            username: user.username,
            text: text,
            date: new Date()
        };

        // сортировка комментариев (от новых к старым с помощью "unshift")
        diy_project.comments.unshift(comment);
        await diy_project.save();

        res.status(201).json(diy_project);
    } catch (err) {
        console.error('Ошибка:', err);
        res.status(500).json({ message: err.message });
    }
});

// Получение всех комментариев (отправка GET-запроса на сервер)
router.get('/:diy_projectId/comments', async (req, res) => {
    const { diy_projectId } = req.params;

    try {
        const diy_project = await DIY_Project.findById(diy_projectId).populate({
            path: 'comments.user',
            select: 'username'  // Только поле username
        });
        if (!diy_project) {
            return res.status(404).json({ message: 'diy_project не найден' });
        }

        res.json(diy_project.comments);
    } catch (err) {
        console.error('Ошибка:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;