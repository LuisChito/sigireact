import React from 'react';
import {
  Home,
  Tag,
  Plus,
  Truck,
  RotateCcw,
  Settings,
  Building,
  ClipboardList,
  Users,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './MasterPage.css';

const Sidebar = () => {
  const perfil = localStorage.getItem('perfil');

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">MENÚ PRINCIPAL</h3>

      {perfil === '_SISTEMAS' ? (
        <nav className="sidebar-nav">
          <NavLink to="/panel" className="sidebar-link">
            <Home size={18} />
            <span>Inicio</span>
          </NavLink>

          <NavLink to="/IngresoInsumos" className="sidebar-link">
            <Plus size={18} />
            <span>Ingreso de insumos</span>
          </NavLink>

          <NavLink to="/surtir-insumos" className="sidebar-link">
            <Truck size={18} />
            <span>Surtir insumos</span>
          </NavLink>

          <NavLink to="/movimientos" className="sidebar-link">
            <RotateCcw size={18} />
            <span>Movimientos</span>
          </NavLink>

          <NavLink to="/gestion-inventario" className="sidebar-link">
            <Settings size={18} />
            <span>Gestión de inventario</span>
          </NavLink>

          <NavLink to="/inventario-sucursales" className="sidebar-link">
            <Building size={18} />
            <span>Inventario Sucursales</span>
          </NavLink>

          <NavLink to="/solicitud-insumos" className="sidebar-link">
            <ClipboardList size={18} />
            <span>Solicitud Insumos</span>
          </NavLink>
        </nav>
      ) : (
        <nav className="sidebar-nav">
          <NavLink to="/panel" className="sidebar-link">
            <Home size={18} />
            <span>Inicio</span>
          </NavLink>

          <NavLink to="/solicitud-insumos" className="sidebar-link">
            <ClipboardList size={18} />
            <span>Solicitud Insumos</span>
          </NavLink>

          <NavLink to="/inventario-sucursales" className="sidebar-link">
            <Building size={18} />
            <span>Ver Inventario</span>
          </NavLink>

          <NavLink to="/usuarios-asignados" className="sidebar-link">
            <Users size={18} />
            <span>Usuarios Asignados</span>
          </NavLink>
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;
