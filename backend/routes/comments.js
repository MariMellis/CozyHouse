const express = require('express');
const router = express.Router();
const DIY_Project = require('../models/DIY_Project');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Добавление комментария к проекту
router.post('/:diy_projectId/comments', auth, async (req, res) => {
    const { diy_projectId } = req.params;
    const { text } = req.body;

    try {
        const diy_project = await DIY_Project.findById(diy_projectId);
        if (!diy_project) {
            console.log('DIY-проект не найден!');
            return res.status(404).json({ message: 'DIY-проект не найден!' });
        }
        
        console.log('DIY-проект найден:', diy_project);
        console.log('User ID from auth middleware:', req.user);

        const user = await User.findById(req.user); // Извлекаем пользователя по ID
        if (!user) {
            console.log('Нет такого пользователя!');
            return res.status(404).json({ message: 'Нет такого пользователя!' });
        }

        console.log('Пользователь найден:', user);

        const comment = {
            user: req.user._id,
            username: user.username,
            text: text,
            date: new Date()
        };

        diy_project.comments.unshift(comment);
        await diy_project.save();

        res.status(201).json(diy_project);
    } catch (err) {
        console.error('Ошибка при добавлении комментария:', err);
        res.status(500).json({ message: err.message });
    }
});

// Получение всех комментариев к проекту
router.get('/:diy_projectId/comments', async (req, res) => {
    const { diy_projectId } = req.params;

    try {
        const diy_project = await DIY_Project.findById(diy_projectId).populate({
            path: 'comments.user',
            select: 'username'  // Только поле username
        });
        if (!diy_project) {
            return res.status(404).json({ message: 'Проект не найден!' });
        }

        res.json(diy_project.comments);
    } catch (err) {
        console.error('Ошибка при получении комментариев:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;