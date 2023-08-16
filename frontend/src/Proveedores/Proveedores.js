import React from 'react';
import SupplierForm from './SupplierForm';
import SupplierList from './SupplierList';

function Proveedores() {
  return (
    <div className='container'>
      <h1>Página de Proveedores</h1>

      <SupplierForm/>
      <SupplierList/>
      
    </div>
  );
}

export default Proveedores;
