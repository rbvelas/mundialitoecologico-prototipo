import { Link } from 'react-router-dom';

export default function Breadcrumb({ current }) {
  return (
    <p className="breadcrumb">
      <Link to="/">Inicio</Link> &gt; <strong>{current}</strong>
    </p>
  );
}
