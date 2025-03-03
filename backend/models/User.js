/* модель "Пользователь" (коллекция). Тут указаны все поля, которые должны иметь документы этой коллекции. */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true }, // имя (никнейм)
    password: { type: String, required: true }, // пароль
});

const User = mongoose.model('User', UserSchema);

module.exports = User; // экспорт