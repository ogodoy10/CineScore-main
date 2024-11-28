import React, { useState } from 'react';
import styles from './Auth.module.css';
import { fetchAPI } from '../../services/apiClient';

const Auth = ({ onClose, onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
      
        const endpoint = isLogin ? '/users/login' : '/users/register';
        const payload = { username, password };
      
        try {
          const response = await fetchAPI(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
      
          if (response.success) {
            setSuccessMessage(response.message || (isLogin ? 'Login bem-sucedido!' : 'Registro bem-sucedido!'));
      
            if (isLogin) {
              localStorage.setItem(
                'loggedUser',
                JSON.stringify({ username: response.username, role: response.role }) // Ajuste conforme o que o backend retorna
              );
              onLogin({ username: response.username, role: response.role }); // Atualiza o estado do usuário logado
            } else {
              // Registro bem-sucedido
              setIsLogin(true); // Troca para tela de login automaticamente após registro
            }
          } else {
            throw new Error(response.message || 'Erro ao processar a solicitação.');
          }
        } catch (error) {
          setErrorMessage(error.message || 'Erro: Não foi possível concluir a solicitação.');
        }
      };
      

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.authContainer} onClick={(e) => e.stopPropagation()}>
                <button className={styles.backButton} onClick={onClose}>
                    ← Voltar
                </button>
                <div className={styles.authBox}>
                    <h2 className={styles.title}>{isLogin ? 'Login' : 'Registrar'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                placeholder="Usuário"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={styles.inputField}
                            />
                            <span className={styles.icon}>👤</span>
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.inputField}
                            />
                            <span className={styles.icon}>🔒</span>
                        </div>
                        <button type="submit" className={styles.authButton}>
                            {isLogin ? 'Login' : 'Registrar'}
                        </button>
                    </form>
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                    {successMessage && <p className={styles.success}>{successMessage}</p>}
                    <p className={styles.text}>
                        {isLogin ? 'Não tem uma conta?' : 'Já possui uma conta?'}
                        <span
                            onClick={() => setIsLogin(!isLogin)}
                            className={styles.toggle}
                        >
                            {isLogin ? ' Registrar' : ' Login'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
