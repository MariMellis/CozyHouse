import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'; // модуль для работы с HTTP-запросами
import './styles/App.css'; // импорт файла CSS со всеми стилями
import {Link, useNavigate} from 'react-router-dom'; // модуль для работы с ссылками (Link), маршрутами и DOM - изменение содержимого страниц без перезагрузки
import Header from './components/Header'; // шапка страницы
import Footer from './components/Footer'; // подвал страницы
import { Helmet } from 'react-helmet'; // модуль для работы с HTML-тэгами. Здесь он используется для того, чтобы задавать названия вкладкам браузера.

function AddDIY_Project({ token, setToken }) {
    {/* Файл AddDIY_Project.js - форма добавления проекта в БД*/}
    {/* Задаем необходимые поля */}

    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');
    const [difficulty, setDifficulty] = useState(1);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');

    {/* Храним имя пользователя и токен с использованием LocalStorage */}
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

    const handleSubmit = async (e) => {
    e.preventDefault();
    {/* Проверка на тип вводимых данных */}
    if (isNaN(difficulty) || difficulty < 1 || difficulty > 5) {
        setError('Сложность должна быть числом от 1 до 5.');
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('instructions', instructions);
    formData.append('difficulty', difficulty);
    formData.append('description', description);
    if (image) {
    formData.append('image', image);
    }

    {/* Отправка POST-запроса на сервер */}
    try {
    await axios.post('http://localhost:1234/diy_projects',
        formData,
        {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
        }
    );
    alert('Проект успешно добавлен!');
    setTitle('');
    setInstructions('');
    setDifficulty('');
    setDescription('');
    setImage(null);
    } catch (error) {
    console.error(error);
    alert('Ой-ой! Ошибка сервера...');
    }
    };  

  return (
    <div className="App">
      <Helmet>
        <title>Уютный Дом — Добавить проект</title>
      </Helmet>
      <Header token={token} username={username} handleLogout={handleLogout} />

      <div align="center" className="content">
        <form onSubmit={handleSubmit} className = "experiment-form" method="post" encType="multipart/form-data">
        <h2>Добавление проекта</h2>
          {error && <p>{error}</p>}
          <br></br>
          <div>
            <label>Название проекта*:  </label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <br></br>

          <div>
            <label>Инструкции*:  </label>
            <textarea onChange={(e) => setInstructions(e.target.value)} required />
          </div>
          <br></br>

          <div>
            <label>Сложность по шкале от 1 до 5*:  </label>
            <input type="number" min = "1" max = "5" onChange={(e) => setDifficulty(e.target.value)} required />
          </div>
          <br></br>
          
          <div>
            <label>Описание*:  </label>
            <textarea onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <br></br>
          <div>
            <label>Изображение*:  </label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} required/>
          </div>
          <br></br>
          <button className="login-btn" type="submit"><b>ДОБАВИТЬ ПРОЕКТ</b></button>
        </form>
      </div>
      <Footer />
    </div>
  );
} 

export default AddDIY_Project;