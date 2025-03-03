import React, { useState, useEffect } from 'react';
import './styles/App.css'; // импорт файла CSS со всеми стилями
import { Helmet } from 'react-helmet'; // модуль для работы с HTML-тэгами. Здесь он используется для того, чтобы задавать названия вкладкам браузера.
import Header from './components/Header' // шапка страницы
import Footer from './components/Footer' // подвал страницы

function Contacts({ token, setToken }) {
  {/* Страница "Контакты" - страница с ссылками на социальные сети */}
  {/* Храним имя пользователя и токен с использованием LocalStorage */}
  const [username, setUsername] = useState('');
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
      <div className="fade-in">
        <Helmet>
          <title>Уютный Дом - Контакты</title>
        </Helmet>
        <Header token={token} username={username} handleLogout={handleLogout} />
        <div className="object_title">
          <h1>Контакты</h1>
        </div>
        <div className="content">
          <div className="object_title">
            <h2>Мы в Telegram</h2>
            <h2>Мы в Dzen</h2>
            <h2>Мы в Pinterest</h2>
          </div>
          <div className="object_title">
            <a href="https://web.telegram.org"><p>Ссылка на TG-канал</p></a>
            <a href="https://www.dzen.ru"><p>Ссылка на канал в Дзене</p></a>
            <a href="https://www.pinterest.com"><p>Ссылка на Пинтерест</p></a>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Contacts;