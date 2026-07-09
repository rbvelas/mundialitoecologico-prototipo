// /components/Mascota.jsx
import './Mascota.css';

const assets = import.meta.glob('../assets/mascota_*.png', {
  eager: true,
  import: 'default',
});

function findAsset(expresion) {
  const match = Object.entries(assets).find(([path]) =>
    path.endsWith(`mascota_${expresion}.png`)
  );
  return match ? match[1] : null;
}

export default function Mascota({ expresion = 'normal', size = 220, alt, className = '' }) {
  const src = findAsset(expresion);

  if (src) {
    return (
      <img
        className={`mascota-img ${className}`.trim()}
        src={src}
        alt={alt || `Mascota Eco Recrea - ${expresion}`}
        style={{ width: size, height: 'auto' }}
      />
    );
  }

  return (
    <div
      className={`mascota-placeholder ${className}`.trim()}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Mascota: ${expresion}`}
    >
      <span>Mascota: {expresion}</span>
    </div>
  );
}