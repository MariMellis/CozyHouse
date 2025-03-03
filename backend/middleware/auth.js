// middleware/auth.js (Функция промежуточной обработки)
const jwt = require('jsonwebtoken'); //вид токена
const User = require('../models/User'); //модель "Пользователь"

// проверка на наличие токена
const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Токена нет, нужна авторизация!' });
  }

  // проверка токена на валидность
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded.userId;
    next();
  } catch (err) {
    console.error('Ошибка:', err); // Вывод ошибки аутентификации
    res.status(401).json({ message: 'Токен не валиден' });
  }
};

module.exports = auth;