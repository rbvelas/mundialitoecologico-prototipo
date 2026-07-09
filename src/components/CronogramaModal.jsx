// src/components/CronogramaModal.jsx
import { useEffect, useState } from 'react';
import { X, Clock } from 'lucide-react';
import './CronogramaModal.css';

const DIA_1 = [
  { hora: '8:30 am', actividad: 'Recepción de equipos' },
  { hora: '9:15 am', actividad: 'Apertura oficial' },
  { hora: '9:40 am – 11:00 am', actividad: '1er bloque de desafíos (1° grado)' },
  { hora: '12:10 pm – 12:20 pm', actividad: 'Resultados del 1er desafío' },
  { hora: '12:25 pm – 1:40 pm', actividad: '2do bloque de desafíos (2° grado)' },
  { hora: '1:50 pm – 2:00 pm', actividad: 'Resultados del 2do desafío' },
  { hora: '2:00 pm – 2:20 pm', actividad: 'Reconocimiento y fotos' },
];

const DIA_2 = [
  { hora: '8:30 am', actividad: 'Recepción de equipos' },
  { hora: '9:00 am', actividad: 'Apertura oficial' },
  { hora: '9:25 am – 10:25 am', actividad: 'Semifinal' },
  { hora: '10:45 am – 11:05 am', actividad: 'Resultados de semifinal' },
  { hora: '11:15 am – 12:25 pm', actividad: 'Gran Final' },
  { hora: '12:50 pm – 1:10 pm', actividad: 'Resultados finales' },
  { hora: '1:10 pm – 1:40 pm', actividad: 'Premiación y cierre' },
];

export default function CronogramaModal({ onClose }) {
  const [diaActivo, setDiaActivo] = useState(1);
  const items = diaActivo === 1 ? DIA_1 : DIA_2;

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="cronograma-overlay" onClick={onClose}>
      <div
        className="cronograma-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cronograma-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="cronograma-cerrar" onClick={onClose} aria-label="Cerrar cronograma">
          <X size={20} />
        </button>

        <div className="cronograma-encabezado">
          <span className="cronograma-eyebrow">
            <Clock size={13} /> Cronograma oficial
          </span>
          <h2 id="cronograma-titulo">
            Así se vive el <span className="destacado">MUNDIALITO</span>
          </h2>
          <p>El paso a paso de cada jornada, hora por hora.</p>
        </div>

        <div className="cronograma-tabs">
          <button
            type="button"
            className={diaActivo === 1 ? 'activo' : ''}
            onClick={() => setDiaActivo(1)}
          >
            Día 1 · Cuartos de final
          </button>
          <button
            type="button"
            className={diaActivo === 2 ? 'activo' : ''}
            onClick={() => setDiaActivo(2)}
          >
            Día 2 · Semifinal y Final
          </button>
        </div>

        <ol className="cronograma-linea">
          {items.map((item, i) => (
            <li key={i}>
              <span className="cronograma-hora">{item.hora}</span>
              <span className="cronograma-punto" aria-hidden="true" />
              <span className="cronograma-actividad">{item.actividad}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}