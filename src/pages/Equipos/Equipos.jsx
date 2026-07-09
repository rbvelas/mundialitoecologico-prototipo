import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import api from '../../api/client.js';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import Mascota from '../../components/Mascota.jsx';
import { EstadoCarga, EstadoError } from '../../components/EstadoCarga.jsx';
import './Equipos.css';

export default function Equipos() {
  const [equipos, setEquipos] = useState([]);
  const [estado, setEstado] = useState('cargando');

  useEffect(() => {
    let activo = true;
    api
      .get('/equipos')
      .then((res) => {
        if (!activo) return;
        setEquipos(res.data);
        setEstado('listo');
      })
      .catch(() => {
        if (!activo) return;
        setEstado('error');
      });
    return () => {
      activo = false;
    };
  }, []);

  return (
    <div className="container equipos-pagina">
      <Breadcrumb current="Equipos" />

      <div className="equipos-encabezado">
        <div>
          <h1>Los 8 equipos en competencia</h1>
          <p>
            Estudiantes de 1° y 2° de secundaria, organizados en 8 equipos que se
            enfrentan por el título del Mundialito Ecológico.
          </p>
        </div>
        <Mascota expresion="contento" size={150} />
      </div>

      <div className="equipos-aviso">
        <Clock size={16} />
        <span>
          Nombres e integrantes definitivos de los equipos pendientes de
          confirmación por GTH.
        </span>
      </div>

      {estado === 'cargando' && <EstadoCarga mensaje="Cargando equipos..." />}
      {estado === 'error' && (
        <EstadoError mensaje="No se pudo cargar la lista de equipos." />
      )}

      {estado === 'listo' && (
        <div className="equipos-lista">
          {equipos.map((equipo) => (
            <div className="equipo-card card" key={equipo.id}>
              <span
                className="equipo-avatar"
                style={{ background: equipo.color }}
              >
                {equipo.codigo}
              </span>
              <h3>{equipo.nombre}</h3>
              <span className="equipo-estado">
                {equipo.confirmado ? equipo.nombreReal : 'Nombre por confirmar'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
