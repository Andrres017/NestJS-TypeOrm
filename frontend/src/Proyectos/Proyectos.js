import React from 'react';

function Proyectos() {
  return (
    <div>
      <h1>Página de Proyectos</h1>

      {/* Formulario para crear un proyecto */}
      <form>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input type="text" className="form-control" id="nombre" maxLength="255" />
        </div>
        <button type="submit" className="btn btn-primary">Crear</button>
      </form>

      <br />

      {/* Campo para filtrar por nombre */}
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Filtrar por nombre" aria-label="Filtrar por nombre" />
        <button className="btn btn-primary" type="button">
          Buscar <i className="bi bi-search"></i>
        </button>
      </div>

      {/* Tabla de proyectos */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Ejemplo de un proyecto en la tabla */}
          <tr>
            <td>1</td>
            <td>Nombre del Proyecto 1</td>
            <td>
              <button className="btn btn-sm btn-primary">Editar</button>
              <button className="btn btn-sm btn-danger">Eliminar</button>
            </td>
          </tr>
          {/* Agregar más filas aquí para otros proyectos */}
        </tbody>
      </table>

      {/* Paginación */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><button className="page-link">1</button></li>

          <li className="page-item"><button className="page-link">2</button></li>

          <li className="page-item"><button className="page-link">3</button></li>

          <li className="page-item"><button className="page-link">4</button></li>
          {/* Agregar más botones de página aquí */}
        </ul>
      </nav>
    </div>
  );
}

export default Proyectos;
