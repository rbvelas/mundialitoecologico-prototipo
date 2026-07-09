// /pages/Admin.jsx
import { useState } from 'react';
import { Lock, Trophy, Upload } from 'lucide-react';
import api from '../../api/client.js';
import Mascota from '../../components/Mascota.jsx';
import logov2 from '../../assets/logov2.png';
import './Admin.css';

export default function Admin() {
  const [autenticado, setAutenticado] = useState(false);

  return autenticado ? (
    <PanelAdmin onSalir={() => setAutenticado(false)} />
  ) : (
    <LoginAdmin onIngresar={() => setAutenticado(true)} />
  );
}

function LoginAdmin({ onIngresar }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!usuario.trim() || !password.trim()) {
      setError('Completa usuario y contraseña para continuar.');
      return;
    }

    setCargando(true);
    try {
      const res = await api.get('/usuarios_admin', {
        params: { usuario: usuario.trim() },
      });
      const encontrado = res.data[0];

      if (encontrado && encontrado.password === password) {
        onIngresar();
      } else {
        setError('Usuario o contraseña incorrectos.');
      }
    } catch {
      setError('No se pudo validar las credenciales. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-barra">
        <Lock size={16} />
        <span>Acceso restringido • Panel de administración</span>
      </div>

      <div className="admin-login-cuerpo">
        <div className="admin-login-panel">
          <form className="admin-login-card" onSubmit={handleSubmit}>
            <img src={logov2} alt="Eco Recrea" className="admin-login-logo" />
            <h1>Panel de administración</h1>
            <p>Solo personal autorizado de TI</p>

            <label>Usuario</label>
            <input
              type="text"
              placeholder="usuario@ecorecrea"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />

            <label>Contraseña</label>
            <input
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <div className="admin-login-error-msg">{error}</div>}

            <button type="submit" className="btn btn-primary" disabled={cargando}>
              {cargando ? 'Verificando...' : 'Iniciar sesión'}
            </button>
          </form>

          {error && (
            <div className="admin-login-mascota-error">
              <Mascota expresion="enojada" size={100} />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="admin-login-imagen">
          <Mascota expresion="brazos" size={200} />
        </div>
      </div>

      <div className="container admin-una-vez">
        <h2>Una vez dentro</h2>
        <div className="admin-accion card">
          <span className="admin-accion-icono">
            <Trophy size={18} />
          </span>
          <div>
            <h4>Actualizar resultado</h4>
            <p>Registrar el resultado de un enfrentamiento</p>
          </div>
        </div>
        <div className="admin-accion card">
          <span className="admin-accion-icono">
            <Upload size={18} />
          </span>
          <div>
            <h4>Subir galería</h4>
            <p>Agregar fotos o videos de un reto</p>
          </div>
        </div>
        <p className="admin-hint">
          Inicia sesión con <strong>usuario@ecorecrea</strong> /{' '}
          <strong>ecorecrea2026</strong> para ver el panel completo.
        </p>
      </div>
    </div>
  );
}

function PanelAdmin({ onSalir }) {
  const [vista, setVista] = useState('resultado'); // resultado | galeria

  return (
    <div className="admin-panel">
      <div className="admin-login-barra">
        <Lock size={16} />
        <span>Acceso restringido • Panel de administración</span>
        <button className="admin-salir" onClick={onSalir}>
          Cerrar sesión
        </button>
      </div>

      <div className="container admin-panel-cuerpo">
        <h2>Una vez dentro</h2>

        <button
          className={`admin-accion card ${vista === 'resultado' ? 'activo' : ''}`}
          onClick={() => setVista('resultado')}
        >
          <span className="admin-accion-icono">
            <Trophy size={18} />
          </span>
          <div>
            <h4>Actualizar resultado</h4>
            <p>Registrar el resultado de un enfrentamiento</p>
          </div>
        </button>

        <button
          className={`admin-accion card ${vista === 'galeria' ? 'activo' : ''}`}
          onClick={() => setVista('galeria')}
        >
          <span className="admin-accion-icono">
            <Upload size={18} />
          </span>
          <div>
            <h4>Subir galería</h4>
            <p>Agregar fotos o videos de un reto</p>
          </div>
        </button>

        {vista === 'resultado' ? <FormularioResultado /> : <FormularioGaleria />}
      </div>
    </div>
  );
}

function FormularioResultado() {
  const [equipo, setEquipo] = useState('');
  const [enfrentamiento, setEnfrentamiento] = useState('');
  const [notaJurado, setNotaJurado] = useState('');
  const [notaPublico, setNotaPublico] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [exito, setExito] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setExito(false);
    try {
      await api.post('/resultados', {
        equipo,
        enfrentamiento,
        nota_jurado: Number(notaJurado),
        nota_publico: Number(notaPublico),
        estado: 'Por confirmar',
      });
      setExito(true);
      setEquipo('');
      setEnfrentamiento('');
      setNotaJurado('');
      setNotaPublico('');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="admin-form-bloque card">
      <div className="admin-form-columna">
        <h3>Registrar resultado</h3>
        <form onSubmit={handleSubmit}>
          <label>Equipo</label>
          <input
            placeholder="Equipo 1"
            value={equipo}
            onChange={(e) => setEquipo(e.target.value)}
          />

          <label>Reto / enfrentamiento</label>
          <input
            placeholder="Cuartos de final — Reto 1"
            value={enfrentamiento}
            onChange={(e) => setEnfrentamiento(e.target.value)}
          />

          <label>Nota jurado (60%)</label>
          <input
            type="number"
            min="0"
            max="20"
            placeholder="0 - 20"
            value={notaJurado}
            onChange={(e) => setNotaJurado(e.target.value)}
          />

          <label>Nota público (40%)</label>
          <input
            type="number"
            min="0"
            max="20"
            placeholder="0 - 20"
            value={notaPublico}
            onChange={(e) => setNotaPublico(e.target.value)}
          />

          {exito && (
            <div className="admin-exito-msg">¡Resultado guardado correctamente!</div>
          )}

          <button type="submit" className="btn btn-primary" disabled={guardando}>
            {guardando ? 'Guardando...' : 'Guardar resultado'}
          </button>
        </form>
      </div>

      <div className="admin-mascota-decorativa">
        <Mascota expresion="saltando" size={220} />
      </div>
    </div>
  );
}

function FormularioGaleria() {
  const [archivo, setArchivo] = useState(null);
  const [reto, setReto] = useState('');
  const [fecha, setFecha] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [exito, setExito] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setExito(false);
    try {
      await api.post('/galeria', {
        reto,
        ronda_label: fecha,
        tipo: archivo && archivo.type.startsWith('video') ? 'video' : 'foto',
        nombre_archivo: archivo ? archivo.name : 'sin-archivo',
        color: '#1F5E3B',
      });
      setExito(true);
      setArchivo(null);
      setReto('');
      setFecha('');
      e.target.reset();
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="admin-form-bloque card">
      <div className="admin-form-columna">
        <h3>Subir a galería</h3>
        <form onSubmit={handleSubmit}>
          <label>Reto</label>
          <input
            placeholder="Misión Punto Verde"
            value={reto}
            onChange={(e) => setReto(e.target.value)}
          />

          <label>Fecha / jornada</label>
          <input
            placeholder="Cuartos - Reto 1"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

          <label>Archivo (simulado, no se sube el archivo real)</label>
          <input
            type="file"
            onChange={(e) => setArchivo(e.target.files?.[0] || null)}
          />

          {exito && (
            <div className="admin-exito-msg">¡Registro agregado a la galería!</div>
          )}

          <button type="submit" className="btn btn-primary" disabled={guardando}>
            {guardando ? 'Guardando...' : 'Agregar a la galería'}
          </button>
        </form>
      </div>

      <div className="admin-mascota-decorativa">
        <Mascota expresion="saltando" size={220} />
      </div>
    </div>
  );
}