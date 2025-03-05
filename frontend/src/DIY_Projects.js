import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'; // модуль для работы с HTTP-запросами
import './styles/App.css'; // импорт файла CSS со всеми стилями
import { Link, useNavigate } from 'react-router-dom'; // модуль для работы с ссылками (Link), маршрутами и DOM - изменение содержимого страниц без перезагрузки
import Header from './components/Header'; // шапка страницы
import Footer from './components/Footer'; // подвал страницы
import { Helmet } from 'react-helmet'; // модуль для работы с HTML-тэгами. Здесь он используется для того, чтобы задавать названия вкладкам браузера.

function DIY_Projects({ token, setToken }) {
    {/* Файл DIY_Projects.js - страница со списком DIY-проектов */}
    const [diy_projects, setDIY_Projects] = useState([]);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [diy_projectCount, setDIY_ProjectCount] = useState(0);

    const userId = localStorage.getItem('userId'); // Получаем userId из локального хранилища

    {/* Отправляем GET-запрос на сервер с целью получения информации о всех проектах в формате JSON */}
    useEffect(() => {
        const fetchDIY_Projects = async () => {
            const response = await axios.get('http://localhost:1234/diy_projects');
            setDIY_Projects(response.data);
        };

        // Функция для получения количества экспериментов
        const fetchDIY_ProjectCount = async () => {
            const response = await fetch('http://localhost:1234/diy_projects/count');
            const data = await response.json();
            setDIY_ProjectCount(data.count);
        };

        fetchDIY_Projects();
        fetchDIY_ProjectCount(); // Вызов функции для получения количества экспериментов
    }, []);

    {/* handleLogout - Удаляем имя пользователя, его ID и токен из LocalStorage при выходе из приложения */}
    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername('');
    };
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            const storedUsername = localStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
            }
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            setUsername('');
        }
    }, [token]);

    return (
        <div className="App">
            <Helmet>
                <title>Уютный Дом — DIY-проекты</title>
            </Helmet>
            <Header token={token} username={username} handleLogout={handleLogout} />
            <div className="object_title">
                <h1>DIY-проекты</h1>
                {/* Выводим количество проектов в БД */}
                <p>Найдено — {diy_projectCount}</p>
                <Link to="/new_diy_project">
                    <button className="add-button"><b>ДОБАВИТЬ ПРОЕКТ</b></button>
                </Link>
            </div>
            <div align="center" className="content">
                <div className="diy_project-grid">
                    {/* Выводим список проектов в виде "карточек" */}
                    {diy_projects.map(diy_project => (
                        <div className="diy_project-card" key={diy_project._id}>
                            {diy_project.imageUrl && <img src={`http://localhost:1234${diy_project.imageUrl}`} alt={diy_project.title} className="diy_project-image" />}
                            <Link to={`/diy_projects/${diy_project._id}`} className="diy_project-link">
                                <h1 className="diy_project-title">{diy_project.title}</h1>
                            </Link>
                            <div className="diy_project-info">
                                <p><strong>Автор:</strong> {diy_project.username}</p>
                                <p><strong>Дата добавления:</strong> {new Date(diy_project.dateAdded).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default DIY_Projects;