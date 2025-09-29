import React, { useState, useEffect } from 'react';
import Header from '../../../masterPage/Header';
import Sidebar from '../../../masterPage/SideBar';
import './InventarioCaptura.css';

const InventarioCaptura = () => {
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para el item que se está editando actualmente (solo el ID)
  const [editandoId, setEditandoId] = useState(null); 
  
  // Estado para acumular todos los cambios listos para el payload final
  const [cambiosPendientes, setCambiosPendientes] = useState({});

  useEffect(() => {
    const fetchInventario = async () => {
      try {
        const numtda = localStorage.getItem('numtda');
        if (!numtda) {
          setError('Número de tienda no encontrado.');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/inventario/sucursal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ numtda: parseInt(numtda) }),
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del inventario.');
        }

        const data = await response.json();
        const dataConIds = data.map((item, index) => ({ 
          ...item, 
          id: Number(item.id) || index + 1
        })); 
        setInventario(dataConIds);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventario();
  }, []);

  // Función para activar el modo de edición
  const handleEditClick = (id, stockActual) => {
    const itemId = Number(id); 
    setEditandoId(itemId); 
    
    // Si no hay un cambio pendiente para este ítem, lo inicializa
    setCambiosPendientes(prevCambios => ({
      ...prevCambios,
      [itemId]: prevCambios[itemId] !== undefined ? prevCambios[itemId] : stockActual
    }));
  };

  // Función para capturar los valores del input
  const handleChange = (e, id) => {
    const itemId = Number(id);
    const nuevoValor = parseInt(e.target.value) || 0;

    // Registra el cambio en el payload final
    setCambiosPendientes(prevCambios => ({
        ...prevCambios,
        [itemId]: nuevoValor
    }));
  };

  // Función para confirmar la edición de un item y actualizar la tabla local
  const handleGuardarClick = (id) => {
    const stockEditado = cambiosPendientes[id];

    setInventario(inventario.map(item =>
      item.id === id ? { 
        ...item, 
        Piezas: stockEditado, 
        FechaRegistro: new Date().toISOString() 
      } : item
    ));

    setEditandoId(null);
  };

  // Función FINAL para enviar todos los cambios al backend
  const handleFinalizar = async () => {
    const idsConCambios = Object.keys(cambiosPendientes);

    if (idsConCambios.length === 0) {
        alert("No hay cambios para guardar.");
        return;
    }

    const payload = idsConCambios.map(id => {
        const itemOriginal = inventario.find(item => Number(item.id) === Number(id));
        
        return {
            numtda: localStorage.getItem('numtda'), 
            insumo: itemOriginal?.Insumo, 
            modelo: itemOriginal?.Modelo,
            piezas: cambiosPendientes[id],
        };
    });

    console.log('Payload a enviar:', payload);

    try {
        setLoading(true);

        const response = await fetch('/api/inventario/guardarCambios', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload), 
        });

        if (!response.ok) {
            throw new Error('Error al guardar el inventario en el servidor.');
        }

        alert("Inventario guardado con éxito.");
        setCambiosPendientes({}); 
        setLoading(false); 
        
    } catch (err) {
        setError(`Fallo al finalizar: ${err.message}. Revise su conexión y la API.`);
        setLoading(false); 
    }
  };


  // --- Renderizado Condicional de Carga y Error ---
  if (loading && inventario.length === 0) {
    return (
      <>
        <Header />
        <Sidebar />
        <div className="captura-content" style={{ textAlign: 'center', padding: '50px' }}>
          <h1>Cargando Inventario...</h1>
        </div>
      </>
    );
  }

  if (error && inventario.length === 0) {
    return (
      <>
        <Header />
        <Sidebar />
        <div className="captura-content" style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
          <h1>Error al Cargar Datos</h1>
          <p>{error}</p>
        </div>
      </>
    );
  }

  // --- Renderizado Normal ---
  return (
    <>
      <Header />
      <Sidebar />
      <div className="captura-content">
        <h1 className="titulo">Inventario Sucursal</h1>
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <table className="tabla">
            <thead>
              <tr>
                <th>Insumo</th>
                <th>Modelo</th>
                <th>Piezas</th>
                <th>Fecha de Registro</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {inventario.length > 0 ? (
                inventario.map((item) => (
                  <tr key={item.id}>
                    <td>{item.Insumo}</td>
                    <td>{item.Modelo}</td>
                    <td>
                      {editandoId === item.id ? ( 
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <input
                            type="number"
                            // El input ahora lee el valor de `cambiosPendientes`
                            value={cambiosPendientes[item.id] !== undefined ? cambiosPendientes[item.id] : item.Piezas} 
                            onChange={(e) => handleChange(e, item.id)}
                            style={{ width: '80px', padding: '5px' }}
                            min="0"
                          />
                        </div>
                      ) : (
                        // Si no está editando, muestra el valor actual, priorizando los cambios locales
                        cambiosPendientes[item.id] !== undefined ? cambiosPendientes[item.id] : item.Piezas
                      )}
                    </td>
                    <td>
                      {/* Se muestra la fecha de registro original si no hay cambios */}
                      {cambiosPendientes[item.id] !== undefined ? new Date().toLocaleDateString('es-ES') : new Date(item.FechaRegistro).toLocaleDateString('es-ES')}
                    </td>
                    <td>
                      {editandoId === item.id ? (
                        <button 
                          className="btn-add" 
                          onClick={() => handleGuardarClick(item.id)}
                          disabled={!Number.isInteger(cambiosPendientes[item.id])} 
                        >
                          ✓
                        </button>
                      ) : (
                        <button 
                          className="btn-add" 
                          onClick={() => handleEditClick(item.id, item.Piezas)}
                          disabled={editandoId !== null}
                        >
                          <span role="img" aria-label="edit">✏️</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr key="no-insumos-row">
                  <td colSpan="5">No se encontraron insumos para esta sucursal.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="acciones">
            <button 
              className="btn-primary" 
              onClick={handleFinalizar}
              disabled={loading || Object.keys(cambiosPendientes).length === 0}
            >
              {loading ? 'Guardando...' : 'Finalizar'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventarioCaptura;