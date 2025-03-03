import React, { useState, useEffect } from 'react'; 
import './styles/App.css'; // импорт файла CSS со всеми стилями
import { Helmet } from 'react-helmet'; // модуль для работы с HTML-тэгами. Здесь он используется для того, чтобы задавать названия вкладкам браузера.
import Header from './components/Header'; // шапка страницы
import Footer from './components/Footer'; // подвал страницы
import about_1 from './styles/image_1.jpeg'; // картинка 1 для страницы "О нас"
import about_2 from './styles/image_2.jpg'; // картинка 2 для страницы "О нас"
import about_3 from './styles/image_3.jpeg'; // картинка 3 для страницы "О нас"

function About({token, setToken}) {
  {/* Страница "О нас" - страница с миссией и кратким описанием смысла веб-приложения */}
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
        <Helmet>
          <title>Уютный Дом - О нас</title>
          {/* Загружаем шрифты*/}
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" />
        </Helmet>
        <Header token={token} username={username} handleLogout={handleLogout} />
        <div className="object_title">
            <h1>О нас</h1>
        </div>
        <div className="content">
          <div className="object_title" align="right">
            <img src={about_1} alt="Логотип" className="image"/>
            <p>Добро пожаловать на страницу "Уютный Дом" — вашего надежного помощника в мире DIY-проектов! Мы создали этот сайт для тех, кто любит превращать свои идеи в реальность, кто ценит уют и комфорт, созданный своими руками.</p>
          </div>
          <br></br>
          <div className="object_title" align="left">
            <p>"Уютный Дом" — это не просто сборник проектов, это вдохновение, идеи и пошаговые инструкции для всех, кто хочет сделать свой дом особенным. Мы верим, что каждый, независимо от опыта, может создать что-то уникальное и красивое. Наши проекты охватывают самые разные области: от мебели и декора до ремонта и организации пространства.</p>
            <img src={about_2} alt="Логотип" className="image"/>
          </div>
          <br></br>
          <div className="object_title" align="right">
            <img src={about_3} alt="Логотип" className="image"/>
            <p>Присоединяйтесь к нашему сообществу DIY-энтузиастов! Делитесь своими успехами, задавайте вопросы и находите новые идеи для творчества. Вместе мы сделаем каждый дом уютным и неповторимым. С любовью, Команда "Уютный Дом"</p>
          </div>
          <br></br>
        </div>
        <Footer/>
      </div>
  );
}

export default About;