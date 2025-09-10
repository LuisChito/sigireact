import React from 'react';
import './Section.css';

const Section = () => {
  return (
    <>
      <div className="page page--section">
        <div className="main-content">
          <div className="section__content">
            <h1>SIGI: Sistema de Gestión de Insumos</h1>

            <h3>¿Qué es SIGI?</h3>
            <p>
              SIGI es una plataforma interna diseñada para gestionar de manera centralizada los insumos necesarios en las sucursales de <span>La Mexicana</span>. 
              Permite registrar, controlar y distribuir artículos como <span>tóners</span>, <span>tambores</span>, <span>etiquetas</span> y <span>rollos térmicos</span>, de forma eficiente y organizada.
            </p>

            <h4>¿Para qué sirve?</h4>
            <p>
              Facilita a las tiendas realizar solicitudes de insumos de forma rápida y controlada desde una interfaz web. 
              Al mismo tiempo, el Departamento de Sistemas puede gestionar inventarios, surtir pedidos y monitorear el flujo de insumos en tiempo real.
            </p>

            <h4>¿Qué busca solucionar?</h4>
            <p>
              SIGI elimina la dependencia de solicitudes informales por correo o mensajes, reduciendo errores, pérdidas de información y retrasos. 
              Garantiza una trazabilidad clara de cada solicitud, con historial por tienda y control preciso del inventario.
            </p>

            <p className="last-update">Última Actualización: 03/Jul/2025</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section;
