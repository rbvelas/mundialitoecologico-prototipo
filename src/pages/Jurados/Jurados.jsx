import { useEffect, useState } from 'react';
import { Clock, User } from 'lucide-react';
import api from '../../api/client.js';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import Mascota from '../../components/Mascota.jsx';
import { EstadoCarga, EstadoError } from '../../components/EstadoCarga.jsx';
import './Jurados.css';

export default function Jurados() {
  const [jurados, setJurados] = useState([]);
  const [estado, setEstado] = useState('cargando');

  useEffect(() => {
    let activo = true;
    api
      .get('/jurados')
      .then((res) => {
        if (!activo) return;
        setJurados(res.data);
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
    <div className="container jurados-pagina">
      <Breadcrumb current="Jurados" />

      <div className="jurados-encabezado">
        <div>
          <h1>Conoce a los jurados</h1>
          <p>
            Ellos evalúan el 60% de la nota de cada reto, siguiendo la misma
            rúbrica en las 7 estaciones del torneo.
          </p>
        </div>
        <Mascota expresion="sorprendido" size={140} />
      </div>

      <div className="jurados-aviso">
        <Clock size={16} />
        <span>
          Nombres y biografías definitivas: pendientes de confirmación por otra
          área del proyecto.
        </span>
      </div>

      {estado === 'cargando' && <EstadoCarga mensaje="Cargando jurados..." />}
      {estado === 'error' && (
        <EstadoError mensaje="No se pudo cargar la lista de jurados." />
      )}

      {estado === 'listo' && (
        <div className="jurados-lista">
          {jurados.map((jurado) => (
            <div className="jurado-card card" key={jurado.id}>
              <span className="jurado-avatar">
                <User size={30} />
              </span>
              <h3>{jurado.nombre.replace(' — Por confirmar', '')}</h3>
              <span className="jurado-estado">{jurado.estado}</span>
              <p>{jurado.bio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
