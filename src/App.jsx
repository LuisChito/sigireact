import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Formulario } from './assets/components/formulario';
import HomePage from './assets/components/HomePage';
import Panel from './assets/components/Panel'; //
import IngresoInsumos from './assets/components/pages/sistemas/IngresoInsumos';
import CapturaInsumos from './assets/components/pages/sistemas/CapturaInsumos';

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
        <Route path="/accesoDenegado" element={user ? <HomePage /> : <Navigate to="/" />} />
        <Route
        path="/IngresoInsumos"
        element={
          !user
            ? <Navigate to="/" replace />
            : localStorage.getItem('perfil') === '_SISTEMAS'
              ? <IngresoInsumos />
              : <Navigate to="/AccesoDenegado" replace />
        }
        />
        <Route
        path="/IngresoInsumos/captura"
        element={
          !user
            ? <Navigate to="/" replace />
            : localStorage.getItem('perfil') === '_SISTEMAS'
              ? <CapturaInsumos />
              : <Navigate to="/AccesoDenegado" replace />
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
