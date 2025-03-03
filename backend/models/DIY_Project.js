/* модель "DIY-проект" (коллекция). Тут указаны все поля, которые должны иметь документы этой коллекции. */

const mongoose = require('mongoose');

const DIY_ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true }, // заголовок проекта
    instructions: { type: String, required: true }, // шаги
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // пользователь
    username: { type: String, required: true }, //имя пользователя
    imageUrl: { type: String }, // ссылка на картинку
    difficulty: { type: Number, min: 1, max: 5, required: true }, // сложность
    description: { type: String, required: true }, // краткое описание
    dateAdded: { type: Date, default: Date.now }, // дата добавления
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // пользователь
        username: { type: String }, // имя пользователя
        text: { type: String, required: true }, // текст комментария
        date: { type: Date, default: Date.now } // дата отправления
    }], // массив с комментариями
}, { timestamps: true });

module.exports = mongoose.model('DIY_Project', DIY_ProjectSchema); // экспорт