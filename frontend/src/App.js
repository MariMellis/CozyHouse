import React, { useState, useEffect } from 'react';
import './styles/App.css'; // импорт файла CSS со всеми стилями
import { Helmet } from 'react-helmet'; // модуль для работы с HTML-тэгами. Здесь он используется для того, чтобы задавать названия вкладкам браузера.
import Header from './components/Header'; // шапка страницы
import Footer from './components/Footer'; // подвал страницы
import background from './styles/bg.png'; // загрузка фона для главной страницы
import image_1 from './styles/image_1.jpeg'; // картинка 1 для главной страницы
import image_2 from './styles/image_2.jpeg'; // картинка 2 для главной страницы

function App({token, setToken}) {
  {/* Файл App.js - основной файл веб-приложения (главная страница), который запускается командой в терминале: npm start */}
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
      {/* Задаем стиль фону главной страницы */}
      <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
      >
        <Helmet>
          <title>Уютный Дом - твори, создавай, вдохновляй!</title>
          {/* Загружаем шрифты */}
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" />
        </Helmet>
        <Header token={token} username={username} handleLogout={handleLogout} />
        <div className="content" align="center">
          <h1>Добро пожаловать в веб-приложение «Уютный Дом»!</h1>
          <h2>Превращайте идеи в реальность вместе с нами!</h2>
          <br></br>
          <p>Добро пожаловать на страницу "Уютный Дом" — вашего надежного 
            помощника в мире DIY-проектов!</p>
            <p>Мы создали этот сайт для тех,
            кто любит превращать свои идеи в реальность, кто ценит уют и комфорт,
            созданный своими руками.</p>
          <div className = "image-container">
          <img src={image_1} alt="Image 1" className="image" />
          <img src={image_2} alt="Image 2" className="image" />
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;