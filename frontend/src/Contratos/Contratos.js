import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function Contratos() { const [supplierOptions, setSupplierOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [formData, setFormData] = useState({
    numberContract: '',
    dateStart: '',
    dateFinish: '',
    poliza: '',
    description: '',
    contractType: 'Todo costo',
    contractValueTotal: '',
    supplierId: '',
    proyectId: '',
  });
  const [contracts, setContracts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [numberContract, setNumberContract] = useState('');
  // const [supplierId, setSupplierId] = useState('');
  // const [proyectId, setProyectId] = useState('');
  const [contractType, setContractType] = useState('');
  const [numberContractFilter, setNumberContractFilter] = useState('');
  const [proyectoFilter, setProyectoFilter] = useState('');
  const [proveedorFilter, setProveedorFilter] = useState('');
  const [tipoContratoFilter, setTipoContratoFilter] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchSuppliers();
    fetchProjects();
    fetchContracts(undefined);
  }, [page, limit]);

   // Función para eliminar un contrato
  const handleDeleteContract = (contractId) => {
    // Muestra una ventana de confirmación antes de eliminar
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Envía una solicitud DELETE al servidor
          const response = await fetch(`http://localhost:3000/Contract/${contractId}`, {
            method: 'DELETE',
          });

          const data = await response.json();

          if (data.affected === 1) {
            // Éxito al eliminar el contrato
            Swal.fire('Eliminado', 'El contrato ha sido eliminado correctamente.', 'success');
            // Vuelve a cargar la lista de contratos después de la eliminación
            fetchContracts();
          } else {
            Swal.fire('Error', 'No se pudo eliminar el contrato.', 'error');
          }
        } catch (error) {
          console.error('Error al eliminar el contrato:', error);
          Swal.fire('Error', 'Hubo un error al eliminar el contrato.', 'error');
        }
      }
    });
  }

  // Función para manejar cambios de página
  const handlePageChange = (action) => {
    if (action === 'prev' && page > 1) {
      setPage(page - 1);
    } else if (action === 'next' && page < totalPages) {
      setPage(page + 1);
    }
  };

  // Función para renderizar los números de página
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li className={`page-item ${page === i ? 'active' : ''}`} key={i}>
          <button className="page-link" onClick={() => setPage(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  const fetchContracts = (url) => {

    if (url === undefined) {
      url = `http://localhost:3000/Contract?page=${page}&limit=${limit}&numberContract=${numberContractFilter}&supplierId=${proveedorFilter}&proyectId=${proyectoFilter}&contractType=${tipoContratoFilter}`;
    }
    console.log(url)

    // Realiza la solicitud GET
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Actualiza el estado con los contratos recibidos
        setContracts(data.contracts.contracts);

          // Calcula el número total de páginas
          const totalContracts = data.contracts.total;
          const pages = Math.ceil(totalContracts / limit);
          setTotalPages(pages);
      })
      .catch((error) => {
        console.error('Error al obtener contratos:', error);
      });
  };

  const resetForm = () => {
    setFormData({
      numberContract: '',
      dateStart: '',
      dateFinish: '',
      poliza: '',
      contractType: 'Todo costo',
      contractValueTotal: '',
      supplierId: '',
      proyectId: '',
    });
  };

  // Función para obtener proveedores
  const fetchSuppliers = async () => {
    try {
      const response = await fetch('http://localhost:3000/supplier?page=1&limit=1000');
      const data = await response.json();

      if (Array.isArray(data.items)) {
        const suppliers = data.items.map((item) => ({
          id: item.id,
          fullName: item.fullName,
        }));
        setSupplierOptions(suppliers);
      }
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
    }
  };

  // Función para obtener proyectos
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3000/proyect?page=1&limit=1000');
      const data = await response.json();

      if (Array.isArray(data.items)) {
        const projects = data.items.map((item) => ({
          id: item.id,
          name: item.name,
        }));
        setProjectOptions(projects);
      }
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const numeroFormateado = formatearNumeroColombiano(value);
    setFormData({
      ...formData,
      [name]: numeroFormateado,
    });
  };

  function formatearNumeroColombiano(texto) {
    const soloNumerosComasPuntos = texto.replace(/[^0-9,.]/g, '');
    const numero = parseFloat(soloNumerosComasPuntos.replace(/,/g, '.'));

    if (!isNaN(numero)) {
      const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
      });
      return formatter.format(numero).replace(/[^0-9,.]/g, '');
    }

    return '';
  }

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'reteGarantia') {
      setFormData({
        ...formData,
        [name]: value.replace(/[^0-9,.]/g, ''),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validaciones de campos requeridos y numéricos
    if (
      !formData.numberContract ||
      !formData.dateStart ||
      !formData.dateFinish ||
      !formData.contractValueTotal ||
      !formData.supplierId ||
      !formData.proyectId ||
      !formData.description
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor complete todos los campos.',
      });

      return;
    }

    // Validaciones para campos numéricos de moneda colombiana
    const numericFields = ['contractValueTotal'];
    for (const field of numericFields) {
      if (isNaN(parseFloat(formData[field].replace(/\./g, '').replace(',', '.')))) {
        alert(`El campo ${field} debe ser un número válido de moneda colombiana.`);
        return;
      }
    }

    // Envío de datos al servidor
    try {
      let formaDatav2 = [];

      const suplierFilter = supplierOptions.filter((supplier) => supplier.fullName === formData.supplierId);
      formaDatav2 = Object.assign({}, formData);
      formaDatav2.supplierId = suplierFilter[0].id;

      const projectOptionsFilter = projectOptions.filter((project) => project.name === formData.proyectId);
      formaDatav2.proyectId = projectOptionsFilter[0].id;

      console.log("formaDatav2", formaDatav2, "formData", formData)
      formaDatav2.contractValueTotal = parseFloat(formaDatav2.contractValueTotal)
      formaDatav2.numberContract = formaDatav2.numberContract + ''

      const response = await fetch('http://localhost:3000/Contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formaDatav2),
      });

      const result = await response.json();
      console.log(result);
      if (result.id !== undefined) {
        // El formulario se envió con éxito, puedes realizar acciones adicionales si es necesario
        Swal.fire({
          icon: 'success',
          title: 'contrato registrado exitosamente',
          text: `ID: ${result.id}`,
        });
        resetForm();
        fetchContracts();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar el contrato',
          text: result.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar el contrato',
        text: 'Error al enviar el formulario',
      });
    }
  };

  const handleFilter = () => {
    // Construye la URL con los valores de los estados locales
    const url = `http://localhost:3000/Contract?page=${page}&limit=${limit}&numberContract=${numberContractFilter}&supplierId=${proveedorFilter}&proyectId=${proyectoFilter}&contractType=${tipoContratoFilter}`;

    // Realiza la solicitud GET
    fetchContracts(url);
  };


  return (
    <div className='container'>
      <h1 className='text-center'>Página de Contratos</h1>
      <h3>crear contrato</h3>

      <div >
      <form onSubmit={handleSubmit} className='row'>
        <div className="mb-3 col-3">
          <label htmlFor="numberContract" className="form-label">Número de Contrato:</label>
          <input
            type="text"
            className="form-control"
            id="numberContract"
            name="numberContract"
            value={formData.numberContract}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 col-3">
          <label htmlFor="dateStart" className="form-label">Fecha de Inicio:</label>
          <input
            type="date"
            className="form-control"
            id="dateStart"
            name="dateStart"
            value={formData.dateStart}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 col-3">
          <label htmlFor="dateFinish" className="form-label">Fecha de Finalización:</label>
          <input
            type="date"
            className="form-control"
            id="dateFinish"
            name="dateFinish"
            value={formData.dateFinish}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 col-3">
          <label htmlFor="poliza" className="form-label">Póliza:</label>
          <input
            type="text"
            className="form-control"
            id="poliza"
            name="poliza"
            value={formData.poliza}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 col-3">
          <label htmlFor="contractType" className="form-label">Tipo de Contrato:</label>
          <select
            className="form-select"
            id="contractType"
            name="contractType"
            value={formData.contractType}
            onChange={handleInputChange}
          >
            <option value="Todo costo">Todo costo</option>
            <option value="Servicios">Servicios</option>
            <option value="Mano de obra">Mano de obra</option>
            <option value="Compra">Compra</option>
          </select>
        </div>
        <div className="mb-3 col-3">
          <label htmlFor="contractValueTotal" className="form-label">Total del Valor del Contrato:</label>
          <input
            type="text"
            className="form-control"
            id="contractValueTotal"
            name="contractValueTotal"
            value={formData.contractValueTotal}
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 col-3">
          <label htmlFor="supplierId" className="form-label">Proveedor:</label>
          <input
            type="text"
            className="form-control"
            id="supplierId"
            name="supplierId"
            list="proveedores"
            value={formData.supplierId}
            onChange={handleInputChange}
          />
          <datalist id="proveedores">
            {supplierOptions.map(option => (
              <option key={option.id} value={option.fullName} data-id={option.id}/>
            ))}
          </datalist>
        </div>
        <div className="mb-3 col-3">
          <label htmlFor="proyectId" className="form-label">Proyecto:</label>
          <input
            type="text"
            className="form-control"
            id="proyectId"
            name="proyectId"
            list="proyectos"
            value={formData.proyectId}
            onChange={handleInputChange}
          />
          <datalist id="proyectos">
            {projectOptions.map(option => (
              <option key={option.id} value={option.name} data-id={option.id} />
            ))}
          </datalist>
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="description" className="form-label">Descripcion:</label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className='mt-4 col-3'>
          <button type="submit" className="btn btn-primary">Crear contrato</button>
        </div>
      </form>
    </div>

            <hr></hr>
      
      {/* Formulario para buscar contratos */}
      <div className="input-group mb-3 row">
        <h3>Bucadores</h3>
  <div className="mb-3 col">
    <input
      type="text"
      className="form-control"
      placeholder="Número de Contrato"
      aria-label="Número de Contrato"
      value={numberContractFilter}
      onChange={(e) => setNumberContractFilter(e.target.value)}
    />
  </div>
  <div className="mb-3 col">
    <select
      className="form-select"
      id="buscarProyecto"
      value={proyectoFilter}
      onChange={(e) => setProyectoFilter(e.target.value)}
    >
      <option value="">Todos los proyecto</option>
      {projectOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
  <div className="mb-3 col">
    <select
      className="form-select"
      id="buscarProveedor"
      value={proveedorFilter}
      onChange={(e) => setProveedorFilter(e.target.value)}
    >
      <option value="">Todos los proveedor</option>
      {supplierOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.fullName}
        </option>
      ))}
    </select>
  </div>
  <div className="mb-3 col">
    <select
      className="form-select"
      id="buscarTipoContrato"
      value={tipoContratoFilter}
      onChange={(e) => setTipoContratoFilter(e.target.value)}
    >
      <option value="">Tipo de Contrato</option>
      <option value="Todo costo">Todo costo</option>
      <option value="Servicios">Servicios</option>
      <option value="Mano de obra">Mano de obra</option>
      <option value="Compra">Compra</option>
    </select>
  </div>
  <button className="btn btn-primary" type="button" onClick={handleFilter}>
    Buscar <i className="bi bi-search"></i>
  </button>
</div>



      {/* Tabla de contratos */}
      <h3>Resultados</h3>
<table className="table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Proyecto</th>
      <th>Número de Contrato</th>
      <th>Número de proveedor</th>
      <th>Nombre de proveedor</th>
      <th>Tipo de Contrato</th>
      <th>Valor Total Contrato</th>
      <th>Valor Total otrosi</th>
      <th>Valor Total Rete Garantía</th>
      <th>Valor Total Rete Fic</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
  {contracts.map((contract) => (
            <tr key={contract.id}>
              <td>{contract.id}</td>
              <td>{contract.proyect.name}</td>
              <td>{contract.numberContract}</td>
              <td>{contract.supplier.document}</td>
              <td>{contract.supplier.fullName}</td>
              <td>{contract.contractType}</td>
              <td>{contract.contractValueTotal}</td>
              <td>{contract.contractValue}</td>
              <td>{contract.reteGarantia}</td>
              <td>{contract.reteFit}</td>
              <td>
              <Link to={`/contratos/${contract.id}`} className="btn btn-sm btn-primary">
                  Editar
                </Link>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteContract(contract.id)} // Llama a la función de eliminación con el ID del contrato
                >
                  Eliminar
                </button>
              </td>
              {/* Agrega más datos aquí según tus necesidades */}
            </tr>
          ))}
  </tbody>
</table>


      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange('prev')}>Anterior</button>
          </li>
          {renderPageNumbers()}
          <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange('next')}>Siguiente</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Contratos;
