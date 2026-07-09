import { Link } from 'react-router-dom';
import Mascota from '../../components/Mascota.jsx';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="container not-found">
      <Mascota expresion="sorprendido" size={180} />
      <h1>404 — Esta ruta no existe</h1>
      <p>
        Parece que seguiste un enlace roto o escribiste una dirección que no
        forma parte del prototipo.
      </p>
      <Link to="/" className="btn btn-primary">
        Volver a Inicio
      </Link>
    </div>
  );
}
