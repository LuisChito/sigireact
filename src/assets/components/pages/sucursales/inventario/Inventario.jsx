import React from 'react'
import Sidebar from '../../../masterPage/SideBar'
import Header from '../../../masterPage/Header'
import './Inventario.css'
import {Link} from 'react-router-dom'

const Inventario = () => {
  return (
    <>
    <Header/>
    <Sidebar/>
    <div className="page page--ingreso">
    <div className="main-content">
    <div className="section__content">
      <h1>Inventario de la Sucursal</h1>

      <div>
        <strong>Descripción general:</strong> aquí puedes consultar y gestionar el inventario de tu sucursal en
        tiempo real. Cada modelo de insumo se muestra con su existencia actual para que puedas planificar tus
        pedidos y evitar faltantes. Mantener esta información actualizada es fundamental para que la operación
        de tu sucursal sea eficiente.
      </div>

      <div className="inicioCaptura">
        <p>
          <strong>Uso recomendado:</strong> cuando recibas un nuevo surtido de insumos, utiliza esta sección para <u>registrar la entrada</u>. 
          Esto permitirá que el sistema incremente automáticamente la cantidad de
          cada modelo y refleje el inventario actualizado.  
        </p>

        <p>
          Cada registro incluye la <strong>fecha</strong> de ingreso, el <strong>modelo</strong> del insumo y la
          <strong> cantidad</strong> recibida. De esta manera, el inventario se mantiene exacto y siempre sabrás
          cuánto material tienes disponible.
        </p>

        <Link to="/Inventario/Captura" className="btn primary">
          Iniciar Inventario
        </Link>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Inventario
