import React from 'react';

function Usuarios() {
  return (
    <div className='container'>
      <h1>Página de Usuarios</h1>

      {/* Formulario para crear un usuario */}
      <div className=''>
        <form className='row'>
          <div className="mb-3 col">
            <label htmlFor="usuario" className="form-label">Usuario:</label>
            <input type="text" className="form-control" id="usuario" />
          </div>
          <div className="mb-3 col">
            <label htmlFor="contrasena" className="form-label">Contraseña:</label>
            <input type="password" className="form-control" id="contrasena" />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">Crear</button>
          </div>
        </form>
      </div>
      
      {/* Formulario para buscar usuarios */}
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Filtrar por nombre de usuario" aria-label="Filtrar por nombre de usuario" />
        <button className="btn btn-primary" type="button">
          Buscar <i className="bi bi-search"></i>
        </button>
      </div>

      {/* Tabla de usuarios */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Ejemplo de un usuario en la tabla */}
          <tr>
            <td>1</td>
            <td>Nombre de Usuario 1</td>
            <td>
              <button className="btn btn-sm btn-primary">Editar</button>
              <button className="btn btn-sm btn-danger">Eliminar</button>
            </td>
          </tr>
          {/* Agregar más filas aquí para otros usuarios */}
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

export default Usuarios;
