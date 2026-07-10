// src/components/CronogramaModal.jsx
import { useEffect, useState } from 'react';
import { X, Clock } from 'lucide-react';
import './CronogramaModal.css';

const DIA_1 = [
  { hora: '8:30 am', actividad: 'Recepción de equipos y bienvenida' },
  { hora: '9:25 am', actividad: 'Apertura oficial' },
  { hora: '9:50 am – 10:50 am', actividad: '1er bloque de desafíos (equipos de 1° grado)' },
  { hora: '10:50 am – 11:25 am', actividad: 'Evaluación y deliberación del jurado' },
  { hora: '11:25 am – 12:35 pm', actividad: 'Resultados del 1er bloque' },
  { hora: '12:45 pm – 1:45 pm', actividad: '2do bloque de desafíos (equipos de 2° grado)' },
  { hora: '1:45 pm – 2:10 pm', actividad: 'Evaluación y deliberación del jurado' },
  { hora: '2:10 pm – 2:20 pm', actividad: 'Resultados del 2do bloque' },
  { hora: '2:20 pm – 2:35 pm', actividad: 'Reconocimiento y fotos' },
];

const DIA_2 = [
  { hora: '8:30 am', actividad: 'Recepción de equipos y bienvenida' },
  { hora: '9:00 am', actividad: 'Apertura oficial' },
  { hora: '9:25 am – 10:25 am', actividad: 'Semifinal' },
  { hora: '10:25 am – 10:45 am', actividad: 'Evaluación y deliberación del jurado' },
  { hora: '10:45 am – 11:10 am', actividad: 'Resultados de semifinal y reconocimiento' },
  { hora: '11:25 am – 12:35 pm', actividad: 'Gran Final' },
  { hora: '12:35 pm – 12:55 pm', actividad: 'Evaluación y deliberación del jurado' },
  { hora: '12:55 pm – 1:10 pm', actividad: 'Resultados finales' },
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