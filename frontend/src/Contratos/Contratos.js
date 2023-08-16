import React from 'react';

function Contratos() {
  return (
    <div className='container'>
      <h1>Página de Contratos</h1>

      {/* Formulario para crear un contrato */}
      <div className=''>
        <form className='row'>
          <div className="mb-3 col-3">
            <label htmlFor="numeroContrato" className="form-label">Número de Contrato:</label>
            <input type="number" className="form-control" id="numeroContrato" />
          </div>
          <div className="mb-3 col-3">
            <label htmlFor="poliza" className="form-label">Póliza:</label>
            <input type="text" className="form-control" id="poliza" />
          </div>
          <div className="mb-3 col-3">
            <label htmlFor="tipoContrato" className="form-label">Tipo de Contrato:</label>
            <select className="form-select" id="tipoContrato">
              <option value="Todo costo">Todo costo</option>
              <option value="Servicios">Servicios</option>
              <option value="Mano de obra">Mano de obra</option>
              <option value="Compra">Compra</option>
            </select>
          </div>
          <div className="mb-3 col-3">
            <label htmlFor="reteGarantia" className="form-label">Rete Garantía:</label>
            <input type="number" className="form-control" id="reteGarantia" />
          </div>
          <div className="mb-3 col-3">
            <label htmlFor="reteFit" className="form-label">Rete Fit:</label>
            <input type="number" className="form-control" id="reteFit" />
          </div>
          <div className="mb-3 col-3">
            <label htmlFor="totalValorContrato" className="form-label">Total del Valor del Contrato:</label>
            <input type="number" className="form-control" id="totalValorContrato" />
          </div>
          <div className="mb-3 col-3">
            <label htmlFor="proveedor" className="form-label">Proveedor:</label>
            <select className="form-select" id="proveedor">
              {/* Agregar opciones de proveedores aquí */}
            </select>
          </div>
          <div className='mt-4 col-3'>
            <button type="submit" className="btn btn-primary">Crear</button>
          </div>
        </form>
      </div>
      
      {/* Formulario para buscar contratos */}
      <div className="input-group mb-3 row">
        <div className='mb-3 col'>
          <input type="text" className="form-control" placeholder="Buscar por proveedor" aria-label="Buscar por proveedor" />
        </div>
        <div className='mb-3 col'>
          <select className="form-select" id="buscarTipoContrato">
            <option value="">Tipo de Contrato</option>
            <option value="Todo costo">Todo costo</option>
            <option value="Servicios">Servicios</option>
            <option value="Mano de obra">Mano de obra</option>
            <option value="Compra">Compra</option>
          </select>
        </div>
        <div className='mb-3 col'>
          <input type="text" className="form-control" placeholder="Buscar por póliza" aria-label="Buscar por póliza" />
        </div>
        <div className='mb-3 col'>
          <input type="text" className="form-control" placeholder="Buscar por número de contrato" aria-label="Buscar por número de contrato" />
        </div>
        <button className="btn btn-primary" type="button">
          Buscar <i className="bi bi-search"></i>
        </button>
      </div>

      {/* Tabla de contratos */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Contrato</th>
            <th>Póliza</th>
            <th>Tipo de Contrato</th>
            <th>Proveedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Ejemplo de un contrato en la tabla */}
          <tr>
            <td>1</td>
            <td>12345</td>
            <td>Póliza de ejemplo</td>
            <td>Todo costo</td>
            <td>Proveedor de ejemplo</td>
            <td>
              <button className="btn btn-sm btn-primary">Editar</button>
              <button className="btn btn-sm btn-danger">Eliminar</button>
            </td>
          </tr>
          {/* Agregar más filas aquí para otros contratos */}
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

export default Contratos;
