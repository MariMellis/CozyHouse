import React, { useState } from 'react';
import axios from 'axios'; // модуль для работы с HTTP-запросами
import { useNavigate, Link } from 'react-router-dom'; // модуль для работы с ссылками (Link), маршрутами и DOM - изменение содержимого страниц без перезагрузки
import './styles/App.css'; // импорт файла CSS со всеми стилями
import { Helmet } from 'react-helmet'; // модуль для работы с HTML-тэгами. Здесь он используется для того, чтобы задавать названия вкладкам браузера.
import Header from './components/Header'; // шапка страницы
import Footer from './components/Footer'; // подвал страницы

function Login({ setToken }) {
  {/* Login.js - форма входа в веб-приложение */}
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    {/* Отправка POST-запроса на сервер с целью аутентификации по логину и паролю */}
    try {
      const response = await axios.post('http://localhost:1234/auth/login', { username, password });
      const { token, userId } = response.data;
      setToken(token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username); // Сохраняем username в локальное хранилище
      navigate('/diy_projects');
    } catch (error) {
      console.error('Error during login', error);
      setError('Неправильный логин или пароль. Попробуйте еще раз');
    }
  };

  return (
    <div className="App">
      <Helmet>
        <title>Уютный Дом — Вход</title>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" />
      </Helmet>
      <Header />
        <div className="login-container">
          {/* Форма */}
            <form onSubmit={handleSubmit} className="login-form">
                <h2 align="center">Вход в учетную запись</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    className="login-input"
                    type="text"
                    required
                    placeholder="Ник"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    required
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-btn">Войти</button>
                <p>Еще не с нами? <Link to="/register">Зарегистрируйтесь!</Link></p>
            </form>
      </div>
      <Footer />
    </div>
  );
} 
export default Login;