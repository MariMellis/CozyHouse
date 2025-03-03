import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom'; // модуль для работы с ссылками (Link), маршрутами и DOM - изменение содержимого страниц без перезагрузки
import Logo from './logo.png'; // логотип веб-приложения

{/* Компонента Header - "шапка сайта". Там расположены ссылки на основные страницы приложения */}

const Header = ({ token, username, handleLogout }) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
      setIsDropdownOpen(prev => !prev);
  };

  // Закрытие выпадающего меню при клике вне его
  useEffect(() => {
      const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setIsDropdownOpen(false);
          }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);

    return (
      <header className="App-header">
        <div className="container">
          <div className="logo">
            <a href="/">
              {/* Переход на главную страницу приложения при нажатии на логотип */}
              <img src={Logo} alt="Логотип" className="logo" />
            </a>
          </div>
          {/* Навигационная панель (англ. - navbar) */}
          <nav>
            <ul className="nav-links">
              <Link to="/" className="nav-link">Главная</Link>
              <Link to="/diy_projects" className="nav-link">DIY-проекты</Link>
              <Link to="/about" className="nav-link">О нас</Link>
              <Link to="/contacts" className="nav-link">Контакты</Link>
            </ul>
          </nav>
          {/* Поле для входа / регистрации / вывода имени пользователя */}
          <div className="login">
            {/* Если пользователь вошел, показываем ему меню */}
            {token ? (
              <div className="dropdown" ref={dropdownRef}>
              <span className="username" onClick={toggleDropdown}>👋 Привет, {username}!</span>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/settings" className="dropdown-item">Настройки</Link>
                  <Link to="/my-experiments" className="dropdown-item">Мои DIY-проекты</Link>
                  <button className="dropdown-item" onClick={handleLogout}>Выход из приложения</button>
                </div>
              )}
            </div>
            ) : (
              
              <Link to="/login">
                {/* Если пользователь НЕ вошел, то НЕ показываем ему меню, а показываем кнопку входа */}
                <button className="login-btn"><b>ВХОД / РЕГИСТРАЦИЯ</b></button>
              </Link>
            )}
          </div>
        </div>
      </header>
    );
  };
  
export default Header;