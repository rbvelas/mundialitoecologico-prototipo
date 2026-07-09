// src/pages/ComoFunciona/ComoFunciona.jsx
import { useState } from 'react';
import { ChevronRight, ClipboardCheck, CalendarDays } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import Mascota from '../../components/Mascota.jsx';
import CronogramaModal from '../../components/CronogramaModal.jsx';
import mascotaGuinando from '../../assets/mascota_guiñando.png';
import './ComoFunciona.css';

const RONDAS = [
  { numero: 1, titulo: 'Cuartos de final', detalle: '8 equipos - 4 enfrentamientos' },
  { numero: 2, titulo: 'Semifinales', detalle: '4 equipos - 2 enfrentamientos' },
  { numero: 3, titulo: 'Final', detalle: '2 equipos - 1 gran enfrentamiento' },
];

const RUBRICA = [
  'Creatividad 25%',
  'Funcionalidad 25%',
  'Impacto 20%',
  'Materiales 20%',
  'Presentación 10%',
];

export default function ComoFunciona() {
  const [cronogramaAbierto, setCronogramaAbierto] = useState(false);

  return (
    <div className="container como-funciona">
      <Breadcrumb current="Cómo funciona" />

      <div className="como-funciona-encabezado">
        <h1>¿Cómo funciona el Mundialito?</h1>
        <p>
          Un torneo de eliminación directa: 8 equipos, 3 rondas, 7 desafíos
          ecológicos con materiales reciclados. Así se decide quién avanza en
          cada enfrentamiento.
        </p>
      </div>

      <div className="como-funciona-rondas">
        {RONDAS.map((ronda, i) => (
          <div className="ronda-item" key={ronda.numero}>
            {ronda.numero === 3 && (
              <Mascota expresion="pensativo" size={190} className="mascota-rondas" />
            )}
            <div className="ronda-card card">
              <span className={`ronda-numero ${ronda.numero === 3 ? 'final' : ''}`}>
                {ronda.numero}
              </span>
              <h3>{ronda.titulo}</h3>
              <p>{ronda.detalle}</p>
            </div>
            {i < RONDAS.length - 1 && (
              <ChevronRight className="ronda-flecha" size={28} />
            )}
          </div>
        ))}
      </div>

      <div className="evaluacion-bloque oscuro">
        <div>
          <span className="evaluacion-label">EVALUACIÓN</span>
          <div className="evaluacion-numero">60%</div>
          <span className="evaluacion-sub">JURADO</span>
          <p>Evalúa cada reto con una rúbrica fija en los 7 desafíos:</p>
          <div className="rubrica-chips">
            {RUBRICA.map((r) => (
              <span key={r} className="rubrica-chip">
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="evaluacion-bloque claro">
        <img
          src={mascotaGuinando}
          alt="Mascota guiñando"
          className="mascota-evaluacion"
        />
        <div>
          <span className="evaluacion-label">EVALUACIÓN</span>
          <div className="evaluacion-numero">40%</div>
          <span className="evaluacion-sub">PÚBLICO</span>
          <p>
            Se mide por reacciones en la comunidad de WhatsApp del evento durante
            cada enfrentamiento — sin necesidad de votar en la web.
          </p>
        </div>
      </div>

      <div className="nota-final card">
        <span className="nota-icono">
          <ClipboardCheck size={20} />
        </span>
        <div>
          <h4>El resultado de cada enfrentamiento</h4>
          <p>
            Se calcula combinando ambas notas (60% jurado + 40% público) y se
            publica en la sección <strong>Resultados</strong> para que todo el
            colegio sepa quién avanza de ronda.
          </p>
        </div>
      </div>

      <div className="cronograma-cta card">
        <span className="cronograma-cta-icono">
          <CalendarDays size={20} />
        </span>
        <div className="cronograma-cta-texto">
          <h4>
            ¿Cuándo pasa qué en el <span className="destacado-mundialito">MUNDIALITO</span>?
          </h4>
          <p>Revisa el cronograma oficial de los 2 días de competencia, hora por hora.</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setCronogramaAbierto(true)}
        >
          Ver cronograma →
        </button>
      </div>

      {cronogramaAbierto && (
        <CronogramaModal onClose={() => setCronogramaAbierto(false)} />
      )}
    </div>
  );
}