import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormEdit from './formEdit' 
import Otrosi from './Otrosi'

function EditarContrato() {
  // Obtén el ID del contrato de los parámetros de ruta
  const { contratoId } = useParams();

    console.log(contratoId)
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
