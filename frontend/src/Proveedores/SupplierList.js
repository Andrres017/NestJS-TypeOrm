import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Importa SweetAlert2


function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [fullNameFilter, setFullNameFilter] = useState('');
  const [documentFilter, setDocumentFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
    fetchSuppliers();
  }, [currentPage, fullNameFilter, documentFilter]);

  const fetchSuppliers = async () => {
    try {
        const response = await fetch(
        `http://localhost:3000/supplier?page=${currentPage}&limit=5&fullName=${fullNameFilter}&document=${documentFilter}`
      );

      const data = await response.json();
      setSuppliers(data.items);
      console.log("=================>",data)
      setTotalPages(Math.ceil(data.total / 5)); // Assuming each page has 10 items
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleFilterChange = () => {
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEdit = async (id,name,numDocument,typeDocumen) => {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Proveedor',
      html:
        `<input id="fullName" class="swal2-input" placeholder="Nombre" value="${name}">` +
        `<input id="document" class="swal2-input" type="number" placeholder="Documento" value="${numDocument}" >` +
        `<select id="documentType" class="swal2-select" value="${typeDocumen}" >` +
        '<option value="CC">CC</option>' +
        '<option value="NIT">NIT</option>' +
        '</select>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          fullName: document.getElementById('fullName').value,
          document: document.getElementById('document').value,
          documentType: document.getElementById('documentType').value,
        };
      },
    });

    if (formValues) {
      const { fullName, document, documentType } = formValues;

      try {
        const response = await fetch(`http://localhost:3000/supplier/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName,
            document,
            documentType,
          }),
        });

        const result = await response.json();

        if (result.id !== undefined) {
          Swal.fire({
            icon: 'success',
            title: 'Proveedor editado exitosamente',
          });

          fetchSuppliers();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al editar proveedor',
            text: result.message,
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:3000/supplier/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.affected !== undefined) {
        Swal.fire({
          icon: 'success',
          title: 'Proveedor eliminado exitosamente',
        });

        fetchSuppliers();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar proveedor',
          text: result.message,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="container">

      {/* Formulario para buscar proveedores */}
      <div className="input-group mb-3 row">
        <div className="mb-3 col">
          <input
            type="text"
            className="form-control"
            placeholder="Filtrar por nombre"
            aria-label="Filtrar por nombre"
            value={fullNameFilter}
            onChange={(e) => setFullNameFilter(e.target.value)}
          />
        </div>
        <div className="mb-3 col">
          <input
            type="number"
            className="form-control"
            placeholder="Numero de documento"
            aria-label="Numero de documento"
            value={documentFilter}
            onChange={(e) => setDocumentFilter(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="button" onClick={handleFilterChange}>
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
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.id}</td>
              <td>{supplier.fullName}</td>
              <td>{supplier.document}</td>
              <td>{supplier.documentType}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleEdit(supplier.id,supplier.fullName, supplier.document, supplier.documentType)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(supplier.id)}
                >
                  Eliminar
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    
  );
}

export default SupplierList;
