import React, { useMemo, useState } from "react";
import Sidebar from "../../../masterPage/SideBar";
import Header from "../../../masterPage/Header";
import "./CapturaInsumos.css";

const INSUMOS_DATA = [
  {
    id: 1,
    nombre: "Rollos termicos",
    modelos: [
      { id: "50 pzas", nombre: "50 pzas" },
      { id: "25 pzas", nombre: "25 pzas" },
    ],
  },
  {
    id: 2,
    nombre: "Etiquetas para básculas",
    modelos: [
      { id: "20 pzas", nombre: "20 pzas" },
      { id: "36 pzas", nombre: "36 pzas" },
    ],
  },
  {
    id: 3,
    nombre: "Tóner",
    modelos: [
      { id: "ML2020", nombre: "ML2020" },
      { id: "CF-217A", nombre: "CF-217A" },
      { id: "CF-230X", nombre: "CF-230X" },
      { id: "TN1060", nombre: "TN1060" },
      { id: "TN660", nombre: "TN660" },
      { id: "TN760", nombre: "TN760" },
    ],
  },
  {
    id: 4,
    nombre: "Tambor",
    modelos: [
      { id: "DR-219A", nombre: "DR-219A" },
      { id: "DR-232X", nombre: "DR-232X" },
      { id: "DR-630", nombre: "DR-630" },
      { id: "DR-730", nombre: "DR-730" },
    ],
  },
];

export default function CapturaInsumos() {
  const [insumoId, setInsumoId] = useState("");
  const [modeloId, setModeloId] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [carrito, setCarrito] = useState([]);

  const modelosDisponibles = useMemo(() => {
    const ins = INSUMOS_DATA.find((i) => String(i.id) === String(insumoId));
    return ins ? ins.modelos : [];
  }, [insumoId]);

  const canAdd = insumoId && modeloId && Number(cantidad) > 0;

  const resetLinea = () => {
    setInsumoId("");
    setModeloId("");
    setCantidad(1);
  };

  const onAddLinea = () => {
    if (!canAdd) return;

    const insumo = INSUMOS_DATA.find((i) => String(i.id) === String(insumoId));
    const modelo = modelosDisponibles.find((m) => String(m.id) === String(modeloId));

    setCarrito((prev) => {
      const idx = prev.findIndex(
        (l) => l.insumoId === insumo.id && l.modeloId === modelo.id
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          cantidad: next[idx].cantidad + Number(cantidad),
        };
        return next;
      }
      return [
        ...prev,
        {
          uid: crypto.randomUUID(),
          insumoId: insumo.id,
          insumoNombre: insumo.nombre,
          modeloId: modelo.id,
          modeloNombre: modelo.nombre,
          cantidad: Number(cantidad),
        },
      ];
    });

    resetLinea();
  };

  const onDeleteLinea = (uid) => {
    setCarrito((prev) => prev.filter((l) => l.uid !== uid));
  };

  const onUpdateCantidad = (uid, nuevaCantidad) => {
    setCarrito((prev) =>
      prev.map((l) =>
        l.uid === uid ? { ...l, cantidad: Math.max(1, Number(nuevaCantidad) || 1) } : l
      )
    );
  };

  const isFormReady = carrito.length > 0;

  const buildPayload = () => ({
    movimiento: "Entrada",
    lineas: carrito.map((l) => ({
      insumoId: l.insumoId,
      modeloId: l.modeloId,
      cantidad: l.cantidad,
    })),
  });

  const onGuardar = async () => {
    if (!isFormReady) return;
    try {
      const res = await fetch("/api/inventario/movimientos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setCarrito([]);
      resetLinea();
      alert("Movimiento guardado correctamente ✅");
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar el movimiento.");
    }
  };

  return (
    <div className="captura-container">
      <Header />
      <div className="captura-layout">
        <Sidebar />
        <main className="captura-main">
          <div className="captura-content">
            <h1 className="titulo">Captura de Insumos</h1>
            <section className="card">
              <h2 className="subtitulo">Agregar líneas</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Insumo</label>
                  <select
                    value={insumoId}
                    onChange={(e) => {
                      setInsumoId(e.target.value);
                      setModeloId("");
                    }}
                  >
                    <option value="">Selecciona…</option>
                    {INSUMOS_DATA.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Modelo</label>
                  <select
                    value={modeloId}
                    onChange={(e) => setModeloId(e.target.value)}
                    disabled={!insumoId}
                  >
                    <option value="">{insumoId ? "Selecciona…" : "Primero el insumo"}</option>
                    {modelosDisponibles.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Cantidad</label>
                  <input
                    type="number"
                    min={1}
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                  />
                </div>
                <div className="form-group full">
                  <button
                    onClick={onAddLinea}
                    disabled={!canAdd}
                    className="btn-add"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </section>

            <section className="card">
              <h2 className="subtitulo">Inventario</h2>
              {carrito.length === 0 ? (
                <p>No hay líneas agregadas todavía.</p>
              ) : (
                <table className="tabla">
                  <thead>
                    <tr>
                      <th>Insumo</th>
                      <th>Modelo</th>
                      <th>Cantidad</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((l) => (
                      <tr key={l.uid}>
                        <td>{l.insumoNombre}</td>
                        <td>{l.modeloNombre}</td>
                        <td>
                          <input
                            type="number"
                            min={1}
                            value={l.cantidad}
                            onChange={(e) => onUpdateCantidad(l.uid, e.target.value)}
                          />
                        </td>
                        <td>
                          <button onClick={() => onDeleteLinea(l.uid)} className="btn-delete">
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>

            <div className="acciones">
              <button
                onClick={() => {
                  setCarrito([]);
                  resetLinea();
                }}
                className="btn-secondary"
              >
                Limpiar
              </button>
              <button
                onClick={onGuardar}
                disabled={!isFormReady}
                className="btn-primary"
              >
                Guardar movimiento
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
