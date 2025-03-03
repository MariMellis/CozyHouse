import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'; // модуль для работы с HTTP-запросами
import './styles/App.css'; // импорт файла CSS со всеми стилями
import {useParams, Link, useNavigate} from 'react-router-dom'; // модуль для работы с ссылками (Link), маршрутами и DOM - изменение содержимого страниц без перезагрузки
import Header from './components/Header'; // шапка страницы
import Footer from './components/Footer'; // подвал страницы
import Comments from './components/Comments'; // комментарии 
import { Helmet } from 'react-helmet'; // модуль для работы с HTML-тэгами. Здесь он используется для того, чтобы задавать названия вкладкам браузера.

function DIY_ProjectDetails({ token, setToken }) {
  {/* Файл DIY_ProjectDetails.js - детальное описание DIY-проекта по ID */}
    const { id } = useParams();
    const [diy_project, setDIY_Project] = useState(null);
    const navigate = useNavigate();
  
    const [username, setUsername] = useState('');
  
    useEffect(() => {
        
      const fetchDIY_Project = async () => {
        try {
        {/* Отправляем GET-запрос на сервер с целью получения информации о конкретном проекте по ID в формате JSON */}
        const response = await axios.get(`http://localhost:1234/diy_projects/${id}`);
        setDIY_Project(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке проекта:", error.response ? error.response.data : error.message);
      }
      };
  
      fetchDIY_Project();
    }, [id]);
      {/* Храним имя пользователя, его ID и токен с использованием LocalStorage */}
      const handleLogout = () => {
          setToken('');
          localStorage.removeItem('token');
      localStorage.removeItem('userId');
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
    
    if (!diy_project) {
      return <div>Загрузка...</div>;
    }
  
    return (
      <div className="App">
        <Helmet>
          {/* diy_project.title - выводим название открываемого проекта на вкладке в браузере */}
          <title>{diy_project.title} — Уютный Дом</title>
        </Helmet>
        <Header token={token} username={username} handleLogout={handleLogout} />

            <div className="experiment-details-container">
            <h1 className="experiment-title">{diy_project.title}</h1>
            <div className="experiment-meta">
              {/* показываем основную информацию на "карточке проекта": автора, дату добавления, сложность*/}
              <div>Автор: {diy_project.username}</div>
              <div>Дата добавления: {new Date(diy_project.dateAdded).toLocaleDateString()}</div>
              <div>Сложность: {diy_project.difficulty}</div>
            </div>
            {/* загружаем картинку из папки "./uploads", находящейся на сервере */}
            {diy_project.imageUrl && <img src={`http://localhost:1234${diy_project.imageUrl}`} className="experiment-detail-image" />}
            <br></br>
            <div className="menu2">
              {/* показываем навигационное окно с разделами (как в Википедии) */}
              <p>Содержание</p>
              <ol>
                <li><a href="#description">Описание</a></li>
                <li><a href="#instructions">Инструкции</a></li>
                <li><a href="#comments">Комментарии к эксперименту</a></li>
                <br></br>
              </ol>
            </div>
            <h2 id="description">Описание</h2>
            <div className="experiment-description">
              <p align="left">{diy_project.description}</p>
            </div>

            <div className="experiment-instructions">
              <h2 id="instructions">Инструкции</h2>
              <ol>
                {diy_project.instructions.split('\n').map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
            <div className="experiment-comments">
              <h2 id="comments">Комментарии к эксперименту</h2>
              <Comments diy_projectId={id} token={token} />
            </div>
          </div>
        <Footer />
      </div>
    );
  } 
  export default DIY_ProjectDetails;