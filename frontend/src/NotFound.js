import React, { useState, useEffect } from 'react';
import './styles/App.css'; // импорт файла CSS со всеми стилями
import { Link } from 'react-router-dom'; // модуль для работы с ссылками (Link), маршрутами и DOM - изменение содержимого страниц без перезагрузки
import { Helmet } from 'react-helmet'; // модуль для работы с HTML-тэгами. Здесь он используется для того, чтобы задавать названия вкладкам браузера.
import Header from './components/Header'; // шапка страницы
import Footer from './components/Footer'; // подвал страницы

function NotFound({ token, setToken }) {
	{/* Страница NotFound.js выводится при получении от сервера статус-кода 404 (страница не найдена) */ }
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
				<title>Ой!</title>
			</Helmet>
			<Header token={token} username={username} handleLogout={handleLogout} />
			<div className="object_title">
				<h2>Error 404</h2>
			</div>
			<div className="object_title">
				<p>Запрашиваемая Вами страница не найдена... :(</p>
			</div>
			<Footer />
		</div>
	);
}

export default NotFound;