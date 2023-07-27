import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Persona } from '../Interfaces/IFormulario';
import { eliminarPersona, obtenerPersona } from '../Firebase/Promesas';

export const Eliminar = () => {
  const params = useParams();
  const [persona, setPersona] = useState<Persona | null>(null);

  useEffect(() => {
    if (params.idPersona !== undefined) {
      obtenerPersona(params.idPersona).then((v) => {
        if (v !== undefined && v.idPersona !== undefined) {
          setPersona(v);
        }
      });
    }
  }, [params.idPersona]);

  const eliminar = () => {
    if (params.idPersona) {
      eliminarPersona(params.idPersona).then(() => {
        alert('Se eliminó con éxito');
      });
    }
  };

  if (!persona) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Eliminar Persona</h2>
      <p>¿Estás seguro de que quieres eliminar a {persona.nombre} {persona.Contrasena}?</p>
      <button type="button" onClick={() => eliminar()}>
        Eliminar
      </button>
    </div>
  );
};