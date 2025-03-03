import React from 'react';
import '../styles/App.css' // импорт файла CSS со всеми стилями
import { Link } from 'react-router-dom'; // модуль для работы с ссылками (Link), маршрутами и DOM - изменение содержимого страниц без перезагрузки

{/* Компонента "Подвал" - располагается в конце страницы и содержит год создания приложения и ссылку на политику конф-сти*/}
const Footer = () => {
    return (
        <footer className="footer">
        <p className = "qa"> &copy; Веб-приложение "Уютный Дом", 2024 год  |  <Link to="/policy">Политика конфиденциальности</Link> | </p>
        </footer>
    );
};

export default Footer;