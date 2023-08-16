import React from 'react';

function Proveedores() {
  return (
    <div className='container'>
      <h1>Página de Proveedores</h1>

      {/* Formulario para crear un proveedor */}
      <div className=''>
        <form className='row'>
          <div className="mb-3 col">
            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <input type="text" className="form-control" id="nombre" />
          </div>
          <div className="mb-3 col">
            <label htmlFor="documento" className="form-label">Documento:</label>
            <input type="text" className="form-control" id="documento" />
          </div>
          <div className="mb-3 col">
            <label htmlFor="tipoDocumento" className="form-label">Tipo de Documento:</label>
            <select className="form-select" id="tipoDocumento">
              <option value="CC">CC</option>
              <option value="NIT">NIT</option>
            </select>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">Crear</button>
          </div>
        </form>
      </div>
      
      {/* Formulario para buscar proveedores */}
      <div className="input-group mb-3 row">
        <div className='mb-3 col'>
          <input type="text" className="form-control" placeholder="Filtrar por nombre" aria-label="Filtrar por nombre" />
        </div>
        <div className='mb-3 col'>
          <input type="number" className="form-control" placeholder="Numero de documento" aria-label="Numero de documento" />
        </div>
        <button className="btn btn-primary" type="button">
          Buscar <i className="bi bi-search"></i>
        </button>
      </div>

      {/* Tabla de proveedores */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Tipo de Documento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Ejemplo de un proveedor en la tabla */}
          <tr>
            <td>1</td>
            <td>Nombre del Proveedor 1</td>
            <td>123456789</td>
            <td>CC</td>
            <td>
              <button className="btn btn-sm btn-primary">Editar</button>
              <button className="btn btn-sm btn-danger">Eliminar</button>
            </td>
          </tr>
          {/* Agregar más filas aquí para otros proveedores */}
        </tbody>
      </table>

      {/* Paginación */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><button className="page-link">1</button></li>
          {/* Agregar más botones de página aquí */}
        </ul>
      </nav>
    </div>
  );
}

export default Proveedores;
