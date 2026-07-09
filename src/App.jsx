import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Inicio from './pages/Inicio/Inicio.jsx';
import ComoFunciona from './pages/ComoFunciona/ComoFunciona.jsx';
import Retos from './pages/Retos/Retos.jsx';
import Equipos from './pages/Equipos/Equipos.jsx';
import Jurados from './pages/Jurados/Jurados.jsx';
import Galeria from './pages/Galeria/Galeria.jsx';
import Resultados from './pages/Resultados/Resultados.jsx';
import Admin from './pages/Admin/Admin.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

export default function App() {
  const location = useLocation();
  const esAdmin = location.pathname === '/admin';

  return (
    <>
      {!esAdmin && <Navbar />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/retos" element={<Retos />} />
          <Route path="/equipos" element={<Equipos />} />
          <Route path="/jurados" element={<Jurados />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
