// /pages/Retos.jsx
import { useEffect, useState } from 'react';
import {
  Recycle,
  PawPrint,
  Droplet,
  Wrench,
  Shirt,
  Home,
  Trees,
  Target,
  Clock,
  BarChart3,
} from 'lucide-react';
import api from '../../api/client.js';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import Mascota from '../../components/Mascota.jsx';
import { EstadoCarga, EstadoError } from '../../components/EstadoCarga.jsx';
import './Retos.css';

const ICONOS = {
  recycle: Recycle,
  'paw-print': PawPrint,
  droplet: Droplet,
  wrench: Wrench,
  shirt: Shirt,
  home: Home,
  trees: Trees,
};

const RUBRICA = [
  { nombre: 'Creatividad', valor: '25%' },
  { nombre: 'Funcionalidad', valor: '25%' },
  { nombre: 'Diseño', valor: '20%' },
  { nombre: 'Materiales reciclados', valor: '20%' },
  { nombre: 'Presentación', valor: '10%' },
];

export default function Retos() {
  const [retos, setRetos] = useState([]);
  const [estado, setEstado] = useState('cargando'); // cargando | listo | error

  useEffect(() => {
    let activo = true;
    api
      .get('/retos')
      .then((res) => {
        if (!activo) return;
        setRetos(res.data);
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
    <div className="container retos-pagina">
      <Breadcrumb current="Retos" />

      <div className="retos-encabezado">
        <h1>Los 7 desafíos oficiales</h1>
        <p>
          Cada enfrentamiento del torneo resuelve uno de estos retos, todos
          construidos con materiales reciclados.
        </p>
      </div>

      {estado === 'cargando' && <EstadoCarga mensaje="Cargando los retos..." />}
      {estado === 'error' && (
        <EstadoError mensaje="No se pudo cargar la lista de retos desde el servidor." />
      )}

      {estado === 'listo' && (
        <div className="retos-lista">
          {retos.map((reto, index) => {
            const Icono = ICONOS[reto.icono] || Target;
            return (
              <div
                className={`reto-card card ${index === 0 ? 'reto-card-primero' : ''}`}
                key={reto.id}
              >
                {index === 0 && (
                  <Mascota
                    expresion="emocionado"
                    size={170}
                    className="mascota-retos"
                  />
                )}
                <span className="reto-icono">
                  <Icono size={20} />
                </span>
                <div className="reto-info">
                  <h3>{reto.nombre}</h3>
                  <p>{reto.descripcion}</p>
                  <div className="reto-meta">
                    <span>
                      <Target size={14} /> {reto.entregable}
                    </span>
                    <span>
                      <Clock size={14} /> {reto.duracion_min} min
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="rubrica-bloque card">
        <div className="rubrica-titulo">
          <span className="rubrica-icono">
            <BarChart3 size={18} />
          </span>
          <h3>Rúbrica de evaluación</h3>
        </div>
        <div className="rubrica-tabla">
          {RUBRICA.map((fila) => (
            <div className="rubrica-fila" key={fila.nombre}>
              <span>{fila.nombre}</span>
              <span>{fila.valor}</span>
            </div>
          ))}
        </div>
        <Mascota expresion="normal" size={220} className="mascota-rubrica" />
      </div>
    </div>
  );
}