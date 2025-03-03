/* Маршруты запросов к серверу для аутентификации */

// Необходимые модули
const express = require('express'); // модуль для работы с фреймворком Express.js (для backend)
const bcrypt = require('bcryptjs'); // для хэширования паролей
const jwt = require('jsonwebtoken'); // работа с токенами
const User = require('../models/User'); // модель "Пользователь"
const auth = require('../middleware/auth'); // "middleware"

const router = express.Router(); // маршрутизатор

// Регистрация (отправка POST-запроса на сервер)
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // проверка на существование пользователя
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Такой пользователь уже существует' });
        }
        
        // хэширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).send('User registered successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Ой-ой! Ошибка сервера');
    }
});

// Аутентификация (отправка POST-запроса на сервер)
router.post('/login', async (req, res) => {

    // проверка на наличие такого пользователя
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('Неверный ник / пароль');
        }
        // проверка на совпадение вводимого пароля с паролем в БД
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Неверный ник / пароль');
        }
        
        // отправка токена на сторону клиента (со "сроком жизни" в 1 час)
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token, userId: user._id, username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).send('Ой-ой! Ошибка сервера');
    }
});

module.exports = router;