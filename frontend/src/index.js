import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Contacts from './Сontacts';
import DIY_Projects from './DIY_Projects';
import About from './About';
import Login from './Login';
import Register from './Register';
import PrivacyPolicy from './PrivacyPolicy';
import AddDIY_Project from './AddDIY_Project';
import ProtectedRoute from './ProtectedRoute';
import DIY_ProjectDetails from './DIY_ProjectDetails';
import NotFound from './NotFound';

{/* index.js - файл, в котором расписываются маршруты в клиентской части веб-приложения */}
const Main = () => {

  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const userId = localStorage.getItem('userId');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  // Функция для выхода из системы
  const handleLogout = () => {
    setToken('');
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  };

  // Сохраняем токен в локальное хранилище при его изменении
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [username]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Главная */}
        <Route path="/" element={<App token={token} Home username={username} setToken={setToken} />} />
        {/* Политика конфиденциальности */}
        <Route path="/policy" element={<PrivacyPolicy token={token} username={username} setToken={setToken} />} />
        {/* О нас */}
        <Route path="/about" element={<About token={token} username={username} setToken={setToken} />} />
        {/* Контакты */}
        <Route path="/contacts" element={<Contacts token={token} username={username} setToken={setToken} />} />
        {/* Форма добавления DIY-проекта */}
        <Route path="/new_diy_project" element={<ProtectedRoute token={token}><AddDIY_Project token={token} setToken={setToken} /></ProtectedRoute>} />
        {/* DIY-проекты */}
        <Route path="/diy_projects" element={<DIY_Projects token={token} setToken={setToken} userId={userId} username={username} />} />
        {/* DIY-проект по ID */}
        <Route path="/diy_projects/:id" element={<DIY_ProjectDetails token={token} setToken={setToken} username={username}/>} />
        {/* Вход */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        {/* Регистрация */}
        <Route path="/register" element={<Register />} />
        {/* Если ничего не подходит, выводится страница с HTTP Status Code, имеющим значение 404 (Страница не найдена) */}
        <Route path="*" element={<NotFound token={token} setToken={setToken} username={username}/>} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

reportWebVitals();
