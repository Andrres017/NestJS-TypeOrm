import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [nombreProyectoCrear, setNombreProyectoCrear] = useState('');
  const [nombreProyectoBuscar, setNombreProyectoBuscar] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProyectos(currentPage, nombreProyectoBuscar);
  }, [currentPage, nombreProyectoBuscar]);

  const fetchProyectos = async (page, name) => {
    try {
      const response = await fetch(`http://localhost:3000/proyect?page=${page}&limit=10&name=${name}`);
      const data = await response.json();
      setProyectos(data.items);
      setTotalPages(Math.ceil(data.total / 10)); // Assuming 10 items per page
    } catch (error) {
      console.error('Error fetching proyectos:', error);
    }
  };

  const handleCrearProyecto = async (e) => {
    e.preventDefault();

    const data = {
      name: nombreProyectoCrear,
    };

    try {
      const response = await fetch('http://localhost:3000/proyect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.id !== undefined) {
        Swal.fire({
          icon: 'success',
          title: 'Proyecto creado exitosamente',
          text: `ID: ${result.id}`,
        });
        setNombreProyectoCrear('');
        fetchProyectos(currentPage, nombreProyectoBuscar);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear proyecto',
          text: result.message,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEliminarProyecto = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/proyect/${id}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Proyecto eliminado exitosamente',
            text: `ID: ${id}`,
          });
          fetchProyectos(currentPage, nombreProyectoBuscar);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar proyecto',
            text: data.message,
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleEditarProyecto = async (id) => {
    const { value: nuevoNombre } = await Swal.fire({
      title: 'Editar Nombre del Proyecto',
      input: 'text',
      inputValue: proyectos.find((proyecto) => proyecto.id === id)?.name || '',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor, ingresa un nombre válido';
        }
      },
    });
  
    if (nuevoNombre) {
      try {
        const data = {
          name: nuevoNombre,
        };
  
        const response = await fetch(`http://localhost:3000/proyect/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Nombre del Proyecto actualizado exitosamente',
            text: `Nuevo nombre: ${result.name}`,
          });
          fetchProyectos(currentPage, nombreProyectoBuscar);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar nombre del proyecto',
            text: result.message,
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  return (
    <div>
      <h1>Página de Proyectos</h1>

      {/* Formulario para crear un proyecto */}
      <form onSubmit={handleCrearProyecto}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            maxLength="255"
            value={nombreProyectoCrear}
            onChange={(e) => setNombreProyectoCrear(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear</button>
      </form>

      <br />

      {/* Filtro por nombre */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Filtrar por nombre"
          aria-label="Filtrar por nombre"
          value={nombreProyectoBuscar}
          onChange={(e) => setNombreProyectoBuscar(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => fetchProyectos(currentPage, nombreProyectoBuscar)}
        >
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
          {proyectos.map((proyecto) => (
            <tr key={proyecto.id}>
              <td>{proyecto.id}</td>
              <td>{proyecto.name}</td>
              <td>
              <button className="btn btn-sm btn-primary" onClick={() => handleEditarProyecto(proyecto.id)}>Editar</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleEliminarProyecto(proyecto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Proyectos;
