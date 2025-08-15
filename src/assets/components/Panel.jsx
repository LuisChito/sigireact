import React from 'react';
import Header from './masterPage/Header';
import SideBar from './masterPage/SideBar';
import Section from './pages/Section';
import { Navigate } from 'react-router-dom';


const Panel = () => {
  const perfil = localStorage.getItem('perfil');

  if (perfil === '_SISTEMAS' || perfil === '_ENCARGADO') {
    return (
      <>
        <Header /> 
        <SideBar />
        <Section />
      </>
    );
  } else {
    return <Navigate to="/accesoDenegado" replace />;
  }
};

export default Panel;
