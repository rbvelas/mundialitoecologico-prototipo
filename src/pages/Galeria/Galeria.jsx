import { useEffect, useState } from 'react';
import { Camera, Video } from 'lucide-react';
import api from '../../api/client.js';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import Mascota from '../../components/Mascota.jsx';
import { EstadoCarga, EstadoError } from '../../components/EstadoCarga.jsx';
import './Galeria.css';

const VISIBLES_INICIALES = 4;

export default function Galeria() {
  const [retos, setRetos] = useState([]);
  const [galeria, setGaleria] = useState([]);
  const [estado, setEstado] = useState('cargando');
  const [filtro, setFiltro] = useState('todos');
  const [mostrarTodos, setMostrarTodos] = useState(false);

  useEffect(() => {
    let activo = true;
    Promise.all([api.get('/retos'), api.get('/galeria')])
      .then(([retosRes, galeriaRes]) => {
        if (!activo) return;
        setRetos(retosRes.data);
        setGaleria(galeriaRes.data);
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

  const chipsVisibles = mostrarTodos ? retos : retos.slice(0, VISIBLES_INICIALES);
  const chipsOcultos = retos.length - VISIBLES_INICIALES;

  const items =
    filtro === 'todos' ? galeria : galeria.filter((g) => g.reto === filtro);

  return (
    <div className="container galeria-pagina">
      <Breadcrumb current="Galería" />

      <div className="galeria-encabezado">
        <div>
          <h1>Galería del evento</h1>
          <p>
            Fotos y videos de cada jornada, reto por reto. Se actualiza durante
            el Mundialito desde el Panel de administración.
          </p>
        </div>
        <Mascota expresion="feliz" size={150} />
      </div>

      {estado === 'cargando' && <EstadoCarga mensaje="Cargando la galería..." />}
      {estado === 'error' && (
        <EstadoError mensaje="No se pudo cargar la galería." />
      )}

      {estado === 'listo' && (
        <>
          <div className="galeria-chips">
            <button
              className={filtro === 'todos' ? 'chip activo' : 'chip'}
              onClick={() => setFiltro('todos')}
            >
              Todos
            </button>
            {chipsVisibles.map((reto) => (
              <button
                key={reto.slug}
                className={filtro === reto.slug ? 'chip activo' : 'chip'}
                onClick={() => setFiltro(reto.slug)}
              >
                {reto.nombre}
              </button>
            ))}
            {!mostrarTodos && chipsOcultos > 0 && (
              <button className="chip" onClick={() => setMostrarTodos(true)}>
                + {chipsOcultos} más
              </button>
            )}
          </div>

          {items.length > 0 ? (
            <div className="galeria-lista">
              {items.map((item) => (
                <div
                  className="galeria-item"
                  key={item.id}
                  style={{ background: item.color }}
                >
                  {item.tipo === 'video' ? (
                    <Video size={18} />
                  ) : (
                    <Camera size={18} />
                  )}
                  <span>{item.ronda_label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="galeria-vacio card">
              <Mascota expresion="pensativo" size={110} />
              <div>
                <h3>Todavía no hay fotos de este reto</h3>
                <p>Un espacio en blanco. ¡Vuelve pronto!</p>
              </div>
            </div>
          )}

          <div className="galeria-nota card">
            <Mascota expresion="mitadbrazos" size={140} />
            <div>
              <h3>Así se verá mientras no hay fotos</h3>
              <p>
                Antes del evento, cada sección vacía de la galería mostrará a la
                mascota con un mensaje como "Todavía no hay fotos de este reto,
                un espacio en blanco. ¡vuelve pronto!", en vez de resultados.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
