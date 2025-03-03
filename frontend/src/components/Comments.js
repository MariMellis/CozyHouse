import React, { useState, useEffect } from 'react';
import axios from 'axios'; // модуль для работы с HTTP-запросами

{/* Компонента Comments для работы с комментариями в React */}

const Comments = ({ diy_projectId, token }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    {/*Отображение комментариев*/}

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:1234/comments/${diy_projectId}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [diy_projectId]);

    {/* Добавление комментария */}
    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await axios.post(`http://localhost:1234/comments/${diy_projectId}/comments`, { text: newComment }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setComments(response.data.comments);
            setNewComment('');
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    {/*Секция с формой и списком комментариев*/}

    return (
        <div className="comments-section">
            {/* Если пользователь зарегистрирован и авторизован... */}
            {token ? (
                <><div>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Добавьте комментарий..."
                    />
                    <button align = "right" className = "login-btn" onClick={handleAddComment}>Отправить</button>
                </div></>
            ) : (
                <><br></br>
                {/* Если пользователь НЕ зарегистрирован и/или НЕ авторизован... */}
                <p align = "center">Только зарегистрированные пользователи могут оставлять комментарии.</p></>
            )}
            <br></br>
            {/* Список комментариев */}
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>
                        <b>{comment.username}</b>
                        <p>{comment.text}</p>
                        <p className="commentDate">{new Date(comment.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments; {/* Экспорт компоненты */}