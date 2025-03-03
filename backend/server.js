// Конфигурационный файл сервера Express.js.
// Запускается с помощью команды: node server.js

const express = require('express'); // модуль для работы с фреймворком Express.js (для backend)
const bodyParser = require('body-parser'); // используется для разбора тела входящих HTTP-запросов
const mongoose = require('mongoose'); // модуль для работы с СУБД MongoDB
const cors = require('cors'); // механизм, который позволяет определить список ресурсов, к которым страница может получить доступ.
const connectDB = require('./config/db'); // Конфигурационный файл БД MongoDB
const path = require('path'); // модуль для работы с путями
const fs = require('fs'); // работа с файловой системой

const app = express(); // инициализация серверного приложения
connectDB(); // подключение к БД

// Проверка и создание директории 'uploads' (если такой изначально нет)
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Использование маршрутов для работы
app.use('/auth', require('./routes/auth'));
app.use('/diy_projects', require('./routes/diy_projects'));
app.use('/comments', require('./routes/comments'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({ extended: true }));

// Простая проверка работы сервера. Вывод страницы с краткой информацией
app.get('/', (req, res) => {
  const uptime = process.uptime().toFixed(0);
  const nodeVersion = process.version;

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Server is working!</title>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; background: #f4f4f4; margin: 0; padding: 20px; }
        h1 { color: #4CAF50; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin: 20px auto; width: 80%; }
      </style>
    </head>
    <body>
      <h1>🚀 Сервер работает!</h1>
      <div class="card">
        <p><strong>Node.js версия:</strong> ${nodeVersion}</p>
        <p><strong>Аптайм:</strong> ${uptime} секунд</p>
        <canvas id="loadChart" width="400" height="200"></canvas>
      </div>
    </body>
    </html>
  `);
});

// Вывод страницы об ошибке 404, если что-то не нашлось
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Задаем порт для сервера
const PORT = process.env.PORT || 1234;

//Выводим сообщение о запуске сервера, если все ОК
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});