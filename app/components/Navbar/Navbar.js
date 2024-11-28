"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import styles from './Navbar.module.css';
import Link from 'next/link';
import SearchBar from './SearchBar/SearchBar';
import Auth from '../../views/authentication/Auth';

const Navbar = () => {
  const [loggedUser, setLoggedUser] = useState(null); // Usuário logado com role
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const router = useRouter(); // Inicializa o useRouter

  // Verificar se há um usuário logado no localStorage
  useEffect(() => {
    const user = localStorage.getItem('loggedUser');
    if (user) {
      setLoggedUser(JSON.parse(user)); // Parseia para obter username e role
    }
  }, []);

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem('loggedUser'); // Remove o usuário do localStorage
    setLoggedUser(null); // Atualiza o estado
    router.push('/'); // Redireciona para a página inicial
  };

  // Função para abrir o modal
  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  // Função para fechar o modal
  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  // Função para lidar com o login
  const handleLogin = (userData) => {
    setLoggedUser(userData); // Define o usuário logado com username e role
    localStorage.setItem('loggedUser', JSON.stringify(userData)); // Armazena no localStorage
    closeAuthModal(); // Fecha o modal após login
  };

  return (
    <>
      <div className={styles.Nav}>
        <div className={styles.logo}>CineScore</div>
        <div className={styles.navLinks}>
          {/* Home e Filmes aparecem para todos */}
          <Link href="/" className={styles.navLink}>Home</Link>

          {/* Gerenciar aparece apenas para ADMIN */}
          {loggedUser?.role === 'ADMIN' && (
            <Link href="/views/Admin" className={styles.navLink}>
              Gerenciar
            </Link>
          )}

        </div>
        <div className={styles.searchContainer}>
          <SearchBar />
        </div>
        <div className={styles.userActions}>
          {loggedUser ? (
            <div className={styles.profileContainer}>
              <img
                src="/placeholder-profile.png" // Adicione uma imagem placeholder
                alt="Profile"
                className={styles.profileImage}
              />
              <span className={styles.userName}>{loggedUser.username}</span>
              <button className={styles.logoutButton} onClick={handleLogout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="24" 
                  height="24" 
                  fill="currentColor" 
                >
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                </svg>
              </button>

            </div>
          ) : (
            <button
              className={styles.signUpButton}
              onClick={openAuthModal} // Abre o modal
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
      {isAuthModalOpen && (
        <Auth
          onClose={closeAuthModal} // Passa função para fechar o modal
          onLogin={handleLogin} // Passa função para lidar com o login
        />
      )}
    </>
  );
};

export default Navbar;
