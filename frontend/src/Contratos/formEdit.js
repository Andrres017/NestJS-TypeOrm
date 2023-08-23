import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function FormEdit({ contractId }) {
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [formData, setFormData] = useState({
    numberContract: '',
    dateStart: '',
    dateFinish: '',
    poliza: '',
    contractType: 'Todo costo',
    reteGarantia: '',
    reteFit: '',
    contractValueTotal: '',
    supplierId: '',
    proyectId: '',
  });

  useEffect(() => {
    fetchSuppliers();
    fetchProjects();
    fetchContractData();
  }, [contractId]);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('http://localhost:3000/supplier?page=1&limit=1000');
      const data = await response.json();

      if (Array.isArray(data.items)) {
        const suppliers = data.items.map(item => ({
          id: item.id,
          fullName: item.fullName,
        }));
        setSupplierOptions(suppliers);
      }
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3000/proyect?page=1&limit=1000');
      const data = await response.json();

      if (Array.isArray(data.items)) {
        const projects = data.items.map(item => ({
          id: item.id,
          name: item.name,
        }));
        setProjectOptions(projects);
      }
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
    }
  };

  const fetchContractData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/Contract/${contractId}`);
      const contractData = await response.json();

      setFormData({
        numberContract: contractData.numberContract,
        dateStart: contractData.dateStart.split(' ')[0], // Extracting date part
        dateFinish: contractData.dateFinish.split(' ')[0], // Extracting date part
        poliza: contractData.poliza,
        contractType: contractData.contractType,
        reteGarantia: contractData.reteGarantia,
        reteFit: contractData.reteFit,
        contractValueTotal: contractData.contractValueTotal,
        supplierId: contractData.supplierId,
        proyectId: contractData.proyectId,
      });
    } catch (error) {
      console.error('Error al obtener datos del contrato:', error);
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/Contract/${contractId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      if (result.affected === 1) {
        Swal.fire({
          icon: 'success',
          title: 'Contrato actualizado exitosamente',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el contrato',
          text: 'No se pudo actualizar el contrato.',
        });
      }
    } catch (error) {
      console.error('Error al actualizar contrato:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el contrato',
        text: 'No se pudo actualizar el contrato.',
      });
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
  return (
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
          <label htmlFor="reteGarantia" className="form-label">Rete Garantía:</label>
          <input
            type="text"
            className="form-control"
            id="reteGarantia"
            name="reteGarantia"
            value={formData.reteGarantia}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="mb-3 col-3">
          <label htmlFor="reteFit" className="form-label">Rete Fit:</label>
          <input
            type="text"
            className="form-control"
            id="reteFit"
            name="reteFit"
            value={formData.reteFit}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
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
        <div className='mt-4 col-3'>
          <button type="submit" className="btn btn-primary">Editar</button>
        </div>
      </form>
  );
}

export default FormEdit;
