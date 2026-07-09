import { Loader2 } from 'lucide-react';

export function EstadoCarga({ mensaje = 'Cargando...' }) {
  return (
    <div className="estado-carga">
      <Loader2 className="spin" size={28} />
      <p>{mensaje}</p>
    </div>
  );
}

export function EstadoError({ mensaje = 'No se pudo cargar la información.' }) {
  return (
    <div className="estado-carga">
      <p>{mensaje}</p>
    </div>
  );
}
