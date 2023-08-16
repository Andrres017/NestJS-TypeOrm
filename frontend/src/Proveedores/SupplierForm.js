import React, { useState } from 'react';
import Swal from 'sweetalert2';


function SupplierForm() {
  const [fullName, setFullName] = useState('');
  const [document, setDocument] = useState('');
  const [documentType, setDocumentType] = useState('CC');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      fullName,
      document,
      documentType,
    };

    try {
      const response = await fetch('http://localhost:3000/supplier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result)
      if (result.id !== undefined) {
        Swal.fire({
          icon: 'success',
          title: 'Proveedor registrado exitosamente',
          text: `ID: ${result.id}`,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar proveedor',
          text: result.message,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="">
        <form className="row" onSubmit={handleSubmit}>
          {/* Formulario para crear un proveedor */}
          <div className="mb-3 col">
            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-3 col">
            <label htmlFor="documento" className="form-label">Documento:</label>
            <input
              type="text"
              className="form-control"
              id="documento"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
            />
          </div>
          <div className="mb-3 col">
            <label htmlFor="tipoDocumento" className="form-label">Tipo de Documento:</label>
            <select
              className="form-select"
              id="tipoDocumento"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="CC">CC</option>
              <option value="NIT">NIT</option>
            </select>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">Crear</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SupplierForm;
