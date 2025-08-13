import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Formulario } from './assets/components/formulario';
import Home from './assets/components/Home';
import HomePage from './assets/components/HomePage';
import Panel from './assets/components/Panel'; //


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!user ? (
          <Formulario setUser={(nombre) => {
            setUser(nombre);
            localStorage.setItem('usuario', nombre);
          }} />
        ) : (
          <Navigate to="/panel" />
        )} />
        
        <Route path="/panel" element={user ? <Panel /> : <Navigate to="/" />} />
        <Route path="/inicio" element={user ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/departamento" element={user ? <HomePage /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
