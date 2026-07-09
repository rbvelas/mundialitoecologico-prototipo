import { useEffect, useState } from 'react';
import api from '../../api/client.js';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import Mascota from '../../components/Mascota.jsx';
import { EstadoCarga, EstadoError } from '../../components/EstadoCarga.jsx';
import ResultadoDetalleModal from '../../components/ResultadoDetalleModal.jsx';
import './Resultados.css';

const RONDAS = [
  { valor: 'cuartos', etiqueta: 'Cuartos de final' },
  { valor: 'semifinales', etiqueta: 'Semifinales' },
  { valor: 'final', etiqueta: 'Final' },
];

export default function Resultados() {
  const [ronda, setRonda] = useState('cuartos');
  const [resultados, setResultados] = useState([]);
  const [estado, setEstado] = useState('cargando');
  const [seleccionado, setSeleccionado] = useState(null);

  useEffect(() => {
    let activo = true;
    setEstado('cargando');
    api
      .get(`/resultados?ronda=${ronda}`)
      .then((res) => {
        if (!activo) return;
        setResultados(res.data);
        setEstado('listo');
      })
      .catch(() => {
        if (!activo) return;
        setEstado('error');
      });
    return () => {
      activo = false;
    };
  }, [ronda]);

  const rondaEtiqueta = RONDAS.find((r) => r.valor === ronda)?.etiqueta;

  return (
    <div className="container resultados-pagina">
      <Breadcrumb current="Resultados" />

      <div className="resultados-encabezado">
        <div>
          <h1>Resultados del torneo</h1>
          <p>
            El marcador oficial, actualizado por el equipo de TI después de cada
            enfrentamiento.
          </p>
        </div>
        <Mascota expresion="contento" size={150} />
      </div>

      <div className="resultados-tabs">
        {RONDAS.map((r) => (
          <button
            key={r.valor}
            className={ronda === r.valor ? 'chip activo' : 'chip'}
            onClick={() => setRonda(r.valor)}
          >
            {r.etiqueta}
          </button>
        ))}
      </div>

      {estado === 'cargando' && <EstadoCarga mensaje="Cargando resultados..." />}
      {estado === 'error' && (
        <EstadoError mensaje="No se pudo cargar el marcador." />
      )}

      {estado === 'listo' && resultados.length === 0 && (
        <div className="resultados-vacio card">
          <Mascota expresion="pensativo" size={110} />
          <p>Todavía no hay enfrentamientos registrados para esta ronda.</p>
        </div>
      )}

      {estado === 'listo' && resultados.length > 0 && (
        <div className="resultados-lista">
          {resultados.map((r) => (
            <button
              type="button"
              className="resultado-card card"
              key={r.id}
              onClick={() => setSeleccionado(r)}
            >
              <div className="resultado-equipos">
                <span>
                  <i style={{ background: r.color_a }} /> {r.equipo_a}
                </span>
                <span className="vs">vs</span>
                <span>
                  <i style={{ background: r.color_b }} /> {r.equipo_b}
                </span>
              </div>
              <div className="resultado-notas">
                <span className="nota-pill jurado">
                  JURADO {r.nota_jurado}%
                </span>
                <span className="nota-pill publico">
                  PÚBLICO {r.nota_publico}%
                </span>
                <span
                  className={
                    r.estado === 'Por jugarse'
                      ? 'nota-pill pendiente'
                      : 'nota-pill avanza'
                  }
                >
                  {r.estado.toUpperCase()}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {seleccionado && (
        <ResultadoDetalleModal
          resultado={seleccionado}
          rondaEtiqueta={rondaEtiqueta}
          onClose={() => setSeleccionado(null)}
        />
      )}
    </div>
  );
}