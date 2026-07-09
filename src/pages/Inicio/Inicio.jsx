// src/pages/Inicio.jsx
import { Link } from 'react-router-dom';
import { Sprout, Trophy, Image as ImageIcon, BarChart3 } from 'lucide-react';
import Mascota from '../../components/Mascota.jsx';
import logoStack from '../../assets/logo.png';
import './Inicio.css';

const TARJETAS = [
  {
    to: '/retos',
    icon: Sprout,
    titulo: 'Retos',
    texto:
      'Los 7 desafíos oficiales, de la estación de reciclaje a tu propio Legado Verde.',
    link: 'Ver los retos',
  },
  {
    to: '/equipos',
    icon: Trophy,
    titulo: 'Equipos',
    texto: 'Conoce a los 8 equipos que compiten por el título de este Mundialito.',
    link: 'Ver equipos',
  },
  {
    to: '/galeria',
    icon: ImageIcon,
    titulo: 'Galería',
    texto: 'Fotos y videos de cada jornada, reto por reto, momento a momento.',
    link: 'Ver galería',
  },
  {
    to: '/resultados',
    icon: BarChart3,
    titulo: 'Resultados',
    texto: 'El marcador del torneo: quién avanza de ronda según jurado y público.',
    link: 'Ver resultados',
  },
];

export default function Inicio() {
  return (
    <div className="inicio">
      <section className="inicio-hero container">
        <div className="inicio-hero-texto">
          <span className="pill-badge">
            <span className="dot" /> III FASE SEDINATA 2026 · SEDIPRO UNT
          </span>
          <h1>
            El planeta juega
            <br />
            de <span className="destacado">local.</span>
          </h1>
          <p className="inicio-descripcion">
            8 equipos, 7 desafíos con materiales reciclados y un solo objetivo:
            dejarle a nuestro colegio un poco más verde de como lo encontramos.
          </p>
          <p className="inicio-sede">I.E. Nueva Esperanza - 1° y 2° de secundaria</p>
          <div className="inicio-botones">
            <Link to="/retos" className="btn btn-primary">
              Ver los 7 retos →
            </Link>
            <Link to="/como-funciona" className="btn btn-secondary">
              Cómo funciona
            </Link>
          </div>
        </div>

        <div className="inicio-hero-imagen">
          <span className="pill-flotante">
            <strong>8</strong> equipos
            <br />
            en juego
          </span>

          <img src={logoStack} alt="Eco Recrea" className="inicio-logo-stack" />

          <div className="inicio-mascota-wrap">
            <Mascota expresion="saltando" size={340} alt="Mascota Eco Recrea saltando" />
          </div>
        </div>
      </section>

      <section className="inicio-explora container">
        <div className="inicio-explora-titulo">
          <h2>Explora el torneo</h2>
          <span>Todo lo que necesitas saber, en un solo lugar</span>
        </div>
        <div className="inicio-tarjetas">
          {TARJETAS.map(({ to, icon: Icon, titulo, texto, link }) => (
            <Link to={to} key={to} className="inicio-tarjeta card">
              <span className="inicio-tarjeta-icono">
                <Icon size={20} />
              </span>
              <h3>{titulo}</h3>
              <p>{texto}</p>
              <span className="inicio-tarjeta-link">{link} →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}