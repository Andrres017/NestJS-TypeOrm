import React, { useState } from 'react';

function Otrosi() {
  const [formData, setFormData] = useState({
    fechaPago: '',
    concepto: '',
    tipo: 'positivo',
    valor: '',
  });

  const [otrosiData, setOtrosiData] = useState([]);
  
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Validación de campos aquí si es necesario

    // Agregar los datos a la lista
    setOtrosiData([...otrosiData, formData]);

    // Limpiar el formulario
    setFormData({
      fechaPago: '',
      concepto: '',
      tipo: 'positivo',
      valor: '',
    });
  };

  return (
    <div>
      <div className="card">
      <div className="card-header">
        <h5>Formulario de Otrosí</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className='row'>
          <div className="mb-3 col">
            <label htmlFor="fechaPago" className="form-label">Fecha de Pago:</label>
            <input
              type="date"
              className="form-control"
              id="fechaPago"
              name="fechaPago"
              value={formData.fechaPago}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3 col">
            <label htmlFor="concepto" className="form-label">Concepto:</label>
            <input
              type="text"
              className="form-control"
              id="concepto"
              name="concepto"
              value={formData.concepto}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3 col">
            <label htmlFor="tipo" className="form-label">Tipo:</label>
            <select
              className="form-select"
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
            >
              <option value="positivo">Positivo</option>
              <option value="negativo">Negativo</option>
            </select>
          </div>
          <div className="mb-3 col">
            <label htmlFor="valor" className="form-label">Valor:</label>
            <input
              type="text"
              className="form-control"
              id="valor"
              name="valor"
              value={formData.valor}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Crear</button>
        </form>
      </div>
    </div>
    <br></br>
    <div className='card'>
      <div className="card-body">
        <div className='row'>
        <h5>Buscar Otrosí</h5>
        <div className="mb-3 col">
          <label htmlFor="fechaBusqueda" className="form-label">Fecha de Pago:</label>
          <input
            type="date"
            className="form-control"
            id="fechaBusqueda"
            name="fechaBusqueda"
          />
        </div>
        <div className="mb-3 col">
          <label htmlFor="tipoBusqueda" className="form-label">Tipo:</label>
          <select
            className="form-select"
            id="tipoBusqueda"
            name="tipoBusqueda"
          >
            <option value="">Todos</option>
            <option value="positivo">Positivo</option>
            <option value="negativo">Negativo</option>
          </select>
        </div>
        <button className="btn btn-primary" >Buscar</button>
        </div>
      </div>
      <div className="card-body">
        <h5>Tabla de Otrosí</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Fecha de Pago</th>
              <th>Concepto</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {otrosiData.map((otrosi, index) => (
              <tr key={index}>
                <td>{otrosi.fechaPago}</td>
                <td>{otrosi.concepto}</td>
                <td>{otrosi.tipo}</td>
                <td>{otrosi.valor}</td>
                <td>
                    
                <button
                  className="btn btn-sm btn-primary">
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger">
                  Eliminar
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className='page-item'>
            <button className="page-link" >Anterior</button>
          </li>
          <li className='page-item'>
            <button className="page-link">
                1
            </button>
          </li>
          <li className='page-item'>
            <button className="page-link">Siguiente</button>
          </li>
        </ul>
      </nav>
      </div>
    </div>
    </div>
  );
}

export default Otrosi;
