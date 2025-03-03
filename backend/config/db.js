/* Конфигурационный файл для работы с базой данных MongoDB*/

// модуль для работы с СУБД MongoDB
const mongoose = require('mongoose'); 

//Подключение к БД с указанием адреса и выводом сообщения о подключении
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/cozyhouse', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB успешно запущен!');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

//экспорт connectDB
module.exports = connectDB;