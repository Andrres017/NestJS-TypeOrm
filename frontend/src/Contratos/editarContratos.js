import React, { useState, useEffect } from 'react';
import FormEdit from './formEdit' 
import Otrosi from './Otrosi'

function EditarContrato() {
  // Obtén el ID del contrato de los parámetros de ruta

  // Agrega lógica para cargar y editar el contrato aquí

  return (
    <div className='container'>
      <FormEdit></FormEdit>
      <Otrosi></Otrosi>
      {/* Agrega el formulario y la lógica de edición aquí */}
    </div>
  );
}

export default EditarContrato;
