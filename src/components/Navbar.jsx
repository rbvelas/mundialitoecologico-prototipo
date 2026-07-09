import { NavLink } from 'react-router-dom';
import logo from '../assets/trofeo.png';
import './Navbar.css';

const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/como-funciona', label: 'Cómo funciona' },
  { to: '/retos', label: 'Retos' },
  { to: '/equipos', label: 'Equipos' },
  { to: '/jurados', label: 'Jurados' },
  { to: '/galeria', label: 'Galería' },
  { to: '/resultados', label: 'Resultados' },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="franja-doble">
        <div className="verde" />
        <div className="amarilla" />
      </div>
      <div className="navbar-inner container">
        <NavLink to="/" className="navbar-brand">
          <img src={logo} alt="Eco Recrea" />
          <span>
            <strong className="eco">MUNDIALITO</strong> ECOLÓGICO
          </span>
        </NavLink>
        <nav className="navbar-links">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                isActive ? 'navbar-link activo' : 'navbar-link'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
