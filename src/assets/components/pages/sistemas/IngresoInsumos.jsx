import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../masterPage/Header';
import SideBar from '../../masterPage/SideBar';
import './IngresoInsumos.css';

const IngresoInsumos = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <SideBar />

      <div className="page page--ingreso">
        <div className="main-content">
          <div className="section__content">
            <h1>Ingreso de Insumos</h1>

            <div>
              <strong>Uso recomendado:</strong> esta sección se utiliza <u>después de recibir</u> el surtido. Da clic en
              <b> Iniciar captura</b> para abrir la vista donde registrarás el ingreso y se incrementará el inventario del
              modelo seleccionado.
            </div>

            <div className="inicioCaptura">
              <p>
                Se abrirá la vista de captura para registrar la entrada (fecha, modelo y cantidad) para aumentar el inventario.
              </p>
              <button
                type="button"
                className="btn primary"
                onClick={() => navigate('/IngresoInsumos/captura')}
              >
                Iniciar captura
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngresoInsumos;
