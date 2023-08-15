import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Importa "Routes"
import { faChartBar, faUsers, faProjectDiagram, faUser, faFileContract } from '@fortawesome/free-solid-svg-icons';

// Importa tus componentes
import Dashboard from './Dashboard/Dashboard';
import Proveedores from './Proveedores/Proveedores';
import Proyectos from './Proyectos/Proyectos';
import Usuarios from './usuarios/usuarios';
import Contratos from './Contratos/Contratos';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="sidebar">
          <div className="logo">
            <img src="/images/logo.png" alt="Logo" className="logo-image" />
          </div>
          {/* Enlaces a las diferentes rutas */}
          <Link to="/" className="sidebar-item">
            <FontAwesomeIcon icon={faChartBar} className="icon" />
            Dashboard
          </Link>
          <Link to="/proveedores" className="sidebar-item">
            <FontAwesomeIcon icon={faUsers} className="icon" />
            Proveedores
          </Link>
          <Link to="/proyectos" className="sidebar-item">
            <FontAwesomeIcon icon={faProjectDiagram} className="icon" />
            Proyectos
          </Link>
          <Link to="/usuarios" className="sidebar-item">
            <FontAwesomeIcon icon={faUser} className="icon" />
            Usuarios
          </Link>
          <Link to="/contratos" className="sidebar-item">
            <FontAwesomeIcon icon={faFileContract} className="icon" />
            Contratos
          </Link>
        </div>
        <div className="content">
          {/* Usar el componente "Routes" para envolver las rutas */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/contratos" element={<Contratos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
