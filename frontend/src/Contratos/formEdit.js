import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function FormEdit({ props }) {
  const { contratoId } = useParams();
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [formData, setFormData] = useState({
    numberContract: '',
    dateStart: '',
    dateFinish: '',
    poliza: '',
    contractType: 'Todo costo',
    contractValueTotal: '',
    supplierId: '',
    proyectId: '',
  });

  useEffect(() => {
    fetchSuppliers();
    fetchProjects();
    fetchContractData();
  }, [contratoId]);

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
      const response = await fetch(`http://localhost:3000/contract/${contratoId}`);
      const contractData = await response.json();
      console.log(contractData)
      setFormData({
        numberContract: contractData.numberContract,
        dateStart: contractData.dateStart.split(' ')[0], // Extracting date part
        dateFinish: contractData.dateFinish.split(' ')[0], // Extracting date part
        poliza: contractData.poliza,
        contractType: contractData.contractType,
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
      [name]: (name === 'contractValueTotal')?formatoMexico(value):value,
    });
  };

  const formatoMexico = (number) => {

  
    // Si el número es un string, lo convertimos a número antes de formatearlo
    if (typeof number === 'string') {
      // Verificamos si hay algo a la derecha del punto decimal
      if (number.indexOf('.') !== -1 && number.split('.')[1].length === 0) {
        // Si no hay nada a la derecha del punto decimal, retornamos el número sin formato
        return number;
      }
      number = convertirANumero(number);
    }


    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1,';
    let arr = number.toString().split('.');
    arr[0] = arr[0].replace(exp,rep);
    return arr[1] ? arr.join('.'): arr[0];
  }

  const convertirANumero = (formattedNumber) => {
    // Removemos las comas del string formateado
    const numberString = formattedNumber.replace(/,/g, '');
    // Parseamos el string a un número
    return parseFloat(numberString);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/contract/${contratoId}`, {
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
          <label htmlFor="contractValueTotal" className="form-label">Total del Valor del Contrato:</label>
          <input
            type="text"
            className="form-control"
            id="contractValueTotal"
            name="contractValueTotal"
            value={formData.contractValueTotal}
            //onBlur={handleBlur}
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
