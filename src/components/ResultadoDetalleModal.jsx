// src/components/ResultadoDetalleModal.jsx
import { useEffect } from 'react';
import { X } from 'lucide-react';
import './ResultadoDetalleModal.css';

export default function ResultadoDetalleModal({ resultado, rondaEtiqueta, onClose }) {
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

  if (!resultado) return null;

  const {
    equipo_a,
    equipo_b,
    color_a,
    color_b,
    estado,
    // Campos opcionales: se muestran solo si la API los envía.
    desafio,
    fecha,
    hora,
    comentario_jurado,
    // Desglose por equipo (ideal). Si tu API aún no los manda, cae al
    // formato anterior (una sola nota general del enfrentamiento).
    jurado_a,
    jurado_b,
    publico_a,
    publico_b,
    puntaje_final_a,
    puntaje_final_b,
    // Formato anterior (nota única del enfrentamiento, no por equipo)
    nota_jurado,
    nota_publico,
  } = resultado;

  const tieneDesgloseParEquipo =
    jurado_a != null && jurado_b != null && publico_a != null && publico_b != null;

  const pendiente = (estado || '').toLowerCase() === 'por jugarse';

  const finalA =
    puntaje_final_a != null
      ? puntaje_final_a
      : tieneDesgloseParEquipo
      ? Math.round(jurado_a * 0.6 + publico_a * 0.4)
      : null;
  const finalB =
    puntaje_final_b != null
      ? puntaje_final_b
      : tieneDesgloseParEquipo
      ? Math.round(jurado_b * 0.6 + publico_b * 0.4)
      : null;

  const equipoAGana = finalA != null && finalB != null && finalA > finalB;
  const equipoBGana = finalA != null && finalB != null && finalB > finalA;

  return (
    <div className="resultado-modal-overlay" onClick={onClose}>
      <div
        className="resultado-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resultado-modal-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="resultado-modal-cerrar"
          onClick={onClose}
          aria-label="Cerrar detalle"
        >
          <X size={20} />
        </button>

        <div className="resultado-modal-encabezado">
          {rondaEtiqueta && (
            <span className="resultado-modal-eyebrow">{rondaEtiqueta}</span>
          )}
          {desafio && <h3 id="resultado-modal-titulo">{desafio}</h3>}
          {(fecha || hora) && (
            <span className="resultado-modal-fecha">
              {fecha} {fecha && hora && '·'} {hora}
            </span>
          )}
        </div>

        {tieneDesgloseParEquipo ? (
          <div className="resultado-modal-comparativa">
            <div className={`resultado-modal-columna ${equipoAGana ? 'gana' : ''}`}>
              <div className="resultado-modal-equipo">
                <i style={{ background: color_a }} />
                <span>{equipo_a}</span>
              </div>

              <div className="resultado-modal-mini-barra">
                <div className="resultado-modal-mini-barra-header">
                  <span>Jurado</span>
                  <strong>{jurado_a}%</strong>
                </div>
                <div className="resultado-modal-barra-fondo">
                  <div
                    className="resultado-modal-barra-relleno jurado"
                    style={{ width: `${jurado_a}%` }}
                  />
                </div>
              </div>

              <div className="resultado-modal-mini-barra">
                <div className="resultado-modal-mini-barra-header">
                  <span>Público</span>
                  <strong>{publico_a}%</strong>
                </div>
                <div className="resultado-modal-barra-fondo">
                  <div
                    className="resultado-modal-barra-relleno publico"
                    style={{ width: `${publico_a}%` }}
                  />
                </div>
              </div>

              {finalA != null && (
                <div className="resultado-modal-final">
                  <span>Nota final</span>
                  <strong>{finalA}%</strong>
                </div>
              )}
            </div>

            <span className="resultado-modal-vs-vertical">VS</span>

            <div className={`resultado-modal-columna ${equipoBGana ? 'gana' : ''}`}>
              <div className="resultado-modal-equipo">
                <i style={{ background: color_b }} />
                <span>{equipo_b}</span>
              </div>

              <div className="resultado-modal-mini-barra">
                <div className="resultado-modal-mini-barra-header">
                  <span>Jurado</span>
                  <strong>{jurado_b}%</strong>
                </div>
                <div className="resultado-modal-barra-fondo">
                  <div
                    className="resultado-modal-barra-relleno jurado"
                    style={{ width: `${jurado_b}%` }}
                  />
                </div>
              </div>

              <div className="resultado-modal-mini-barra">
                <div className="resultado-modal-mini-barra-header">
                  <span>Público</span>
                  <strong>{publico_b}%</strong>
                </div>
                <div className="resultado-modal-barra-fondo">
                  <div
                    className="resultado-modal-barra-relleno publico"
                    style={{ width: `${publico_b}%` }}
                  />
                </div>
              </div>

              {finalB != null && (
                <div className="resultado-modal-final">
                  <span>Nota final</span>
                  <strong>{finalB}%</strong>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="resultado-modal-equipos">
              <div className="resultado-modal-equipo">
                <i style={{ background: color_a }} />
                <span>{equipo_a}</span>
              </div>
              <span className="resultado-modal-vs">VS</span>
              <div className="resultado-modal-equipo">
                <i style={{ background: color_b }} />
                <span>{equipo_b}</span>
              </div>
            </div>

            <div className="resultado-modal-barras">
              <div className="resultado-modal-barra">
                <div className="resultado-modal-barra-header">
                  <span>Jurado</span>
                  <strong>{nota_jurado}%</strong>
                </div>
                <div className="resultado-modal-barra-fondo">
                  <div
                    className="resultado-modal-barra-relleno jurado"
                    style={{ width: `${nota_jurado}%` }}
                  />
                </div>
                <span className="resultado-modal-barra-peso">Pesa 60% de la nota final</span>
              </div>

              <div className="resultado-modal-barra">
                <div className="resultado-modal-barra-header">
                  <span>Público</span>
                  <strong>{nota_publico}%</strong>
                </div>
                <div className="resultado-modal-barra-fondo">
                  <div
                    className="resultado-modal-barra-relleno publico"
                    style={{ width: `${nota_publico}%` }}
                  />
                </div>
                <span className="resultado-modal-barra-peso">Pesa 40% de la nota final</span>
              </div>
            </div>

            <p className="resultado-modal-aviso">
              Aún no hay notas separadas por equipo — mostrando el resultado
              general del enfrentamiento.
            </p>
          </>
        )}

        {comentario_jurado && (
          <div className="resultado-modal-comentario">
            <span>Comentario del jurado</span>
            <p>{comentario_jurado}</p>
          </div>
        )}

        <div
          className={
            pendiente
              ? 'resultado-modal-estado pendiente'
              : 'resultado-modal-estado avanza'
          }
        >
          {estado}
        </div>
      </div>
    </div>
  );
}