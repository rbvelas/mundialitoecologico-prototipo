// src/components/GaleriaDetalleModal.jsx
import { useEffect } from 'react';
import { X, Camera, Video } from 'lucide-react';
import Mascota from './Mascota.jsx';
import './GaleriaDetalleModal.css';

export default function GaleriaDetalleModal({ item, retoNombre, onClose }) {
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

  if (!item) return null;

  // `item.imagenes` es opcional: cuando el Panel de administración suba
  // fotos/videos reales para esta entrada, este arreglo tendrá contenido y
  // el modal mostrará la cuadrícula en vez del estado vacío.
  const tieneContenidoReal = Array.isArray(item.imagenes) && item.imagenes.length > 0;

  return (
    <div className="galeria-modal-overlay" onClick={onClose}>
      <div
        className="galeria-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="galeria-modal-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="galeria-modal-cerrar"
          onClick={onClose}
          aria-label="Cerrar galería"
        >
          <X size={20} />
        </button>

        <div className="galeria-modal-encabezado">
          {retoNombre && <span className="galeria-modal-eyebrow">{retoNombre}</span>}
          <h3 id="galeria-modal-titulo">
            {item.tipo === 'video' ? <Video size={18} /> : <Camera size={18} />}
            {item.ronda_label}
          </h3>
        </div>

        {tieneContenidoReal ? (
          <div className="galeria-modal-grid">
            {item.imagenes.map((src, i) => (
              <div className="galeria-modal-grid-item" key={i}>
                <img src={src} alt={`${item.ronda_label} ${i + 1}`} />
              </div>
            ))}
          </div>
        ) : (
          <div className="galeria-modal-vacio">
            <Mascota expresion="pensativo" size={110} />
            <div>
              <h4>Todavía no hay fotos de "{item.ronda_label}"</h4>
              <p>
                Este espacio se llenará con fotos y videos reales durante y
                después del Mundialito Ecológico. ¡Vuelve pronto!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}