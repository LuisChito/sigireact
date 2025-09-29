import React, { useState } from 'react';
import './MasterPage.css';
import logo from '/img/SIGI.png';
import { UserCircle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const usuario = localStorage.getItem('usuario');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [temaOscuro, setTemaOscuro] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('perfil');
    localStorage.removeItem('numtda');
    window.location.href = '/';
  };

  return (
    <header className="header">
      <div className="header-left">
        <a href="/panel">
        <img src={logo} alt="Logo SIGI" className="logo-sigi" />
        </a>
      </div>

      <div className="header-right">
      <div className="user-toggle" onClick={toggleMenu}>
        <UserCircle size={24} color="#ecf0f1" />
        <span className="user-name">{usuario}</span>
        <ChevronDown size={18} color="#ecf0f1" className={`chevron ${menuAbierto ? 'open' : ''}`} />
      </div>

      {menuAbierto && (
        <div className="user-dropdown">
          <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
          )}
        </div>

    </header>
  );
};

export default Header;
