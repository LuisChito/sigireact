import React from 'react'
import Sidebar from '../../../masterPage/SideBar'
import Header from '../../../masterPage/Header'
import './SolicitudInsumos.css'

const SolicitudInsumos = () => {
  return (
    <>
      <Sidebar/>
      <Header/>
      <div className="page page--ingreso">
        <div className="main-content">
          <div className="section__content">
            <h1>Solicitud de insumos</h1>

            <div>
              <strong>Uso recomendado:</strong> esta sección se utiliza  cuando la sucursal <u>requiera pedir insumos</u> para el corecto funcionamiento de la sucursal. Da clic en
              <b> Iniciar solicitud</b> para abrir la vista donde se registrara tu solicitud
            </div>

            <div className="inicioCaptura">
              <p>
               Ten en cuenta que no se podran hacer más de <strong>1 captura por día</strong> para no saturar el sistema así que coordinate con el otro turno para pedir insumos.
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
  )
}

export default SolicitudInsumos
