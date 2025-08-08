import React, { useState } from 'react';
import './Formulario.css';
import logo from '/img/SIGI.png';
import { useNavigate } from 'react-router-dom';

export function Formulario({ setUser }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuario === '' || contrasena === '') {
      setError('TODOS LOS CAMPOS SON OBLIGATORIOS');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password: contrasena })
      });

      const data = await response.json();
      if (data.success) {
  setUser(data.usuario);
  localStorage.setItem('usuario', data.usuario);

      if (data.perfil) {
        localStorage.setItem('perfil', data.perfil);
      }
      navigate('/inicio');
      }

      
      else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="titulo">Bienvenido</h2>
        <form className="formulario" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="extra-links">
          <a href="https://wa.me/+529994459825">Contactar al soporte</a>
        </div>
      </div>
    </div>
  );
}
