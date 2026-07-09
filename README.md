# Eco Recrea — Prototipo Interactivo (Nivel 3)

Prototipo interactivo del Mundialito Ecológico "Eco Recrea": navegación real
entre las 8 pantallas (React + React Router), consumiendo datos de una API
simulada con **json-server**. No hay backend propio, ni base de datos real,
ni autenticación real — todo lo que simula "guardar" o "iniciar sesión" es
una llamada HTTP real contra `db.json`, mientras json-server esté corriendo.

## Requisitos

- Node.js 18 o superior.

## Instalación

```bash
npm install
```

## Cómo correr el prototipo

Necesitas **dos procesos corriendo en paralelo**: la API simulada
(json-server, puerto 3001) y la app de React (Vite, puerto 5173).

### Opción A — un solo comando (recomendado)

```bash
npm run start
```

Esto usa `concurrently` para levantar Vite y json-server al mismo tiempo.
Abre **http://localhost:5173**.

### Opción B — dos terminales separadas

```bash
# Terminal 1
npx json-server --watch db.json --port 3001

# Terminal 2
npm run dev
```

## Estructura

```
prototipo-interactivo/
├── db.json                # Datos de ejemplo: retos, equipos, jurados,
│                           # resultados, galería y usuarios_admin
├── .env                    # VITE_API_URL=http://localhost:3001
├── src/
│   ├── api/client.js       # Cliente axios apuntando a VITE_API_URL
│   ├── assets/              # logo.png, mascota_saltando.png, mascota_brazos.png
│   ├── components/          # Navbar, Mascota (con placeholders), estados de carga
│   └── pages/                # Inicio, ComoFunciona, Retos, Equipos, Jurados,
│                              # Galeria, Resultados, Admin, NotFound
```

## Rutas navegables

| Ruta | Pantalla |
|---|---|
| `/` | Inicio |
| `/como-funciona` | Cómo funciona |
| `/retos` | Retos |
| `/equipos` | Equipos |
| `/jurados` | Jurados |
| `/galeria` | Galería |
| `/resultados` | Resultados |
| `/admin` | Panel de administración (login + panel interno) |
| cualquier otra | Página 404 del prototipo |

## Credenciales de prueba (Panel admin)

```
Usuario:    usuario@ecorecrea
Contraseña: ecorecrea2026
```

Estas credenciales viven en texto plano en `db.json` → `usuarios_admin`,
porque el login es solo una comparación en el cliente contra json-server
(sin hash, sin JWT). Un usuario/contraseña vacíos o incorrectos muestran a
la mascota con expresión "enojada".

## Mascota con expresiones (placeholders)

Los archivos reales `mascota_saltando.png` y `mascota_brazos.png` (y
`mascota_normal.png`, usado como estado neutro en varias pantallas) ya están
en `src/assets/`. Las expresiones que aún no tienen recorte —
`enojada`, `feliz`, `sorprendido`, `pensativo` — se muestran como un
recuadro punteado con el texto "Mascota: [expresión]" gracias al componente
`<Mascota expresion="..." />`. En cuanto agregues
`src/assets/mascota_<expresion>.png`, el componente lo detecta
automáticamente (usa `import.meta.glob`) y reemplaza el placeholder sin
tocar código.

## Qué se simula con json-server (sin backend propio)

- Todas las listas (Retos, Equipos, Jurados, Galería, Resultados) hacen
  `GET` reales contra `http://localhost:3001`, con un breve estado de carga.
- **Galería**: los chips de filtro filtran la respuesta ya obtenida en el
  cliente. Si no hay resultados para el filtro elegido, se muestra
  `<Mascota expresion="pensativo" />`.
- **Resultados**: las pestañas piden `GET /resultados?ronda=cuartos|semifinales|final`.
- **Panel admin — login**: `GET /usuarios_admin?usuario=...` y comparación
  de contraseña en el cliente (simulación, no autenticación real).
- **Panel admin — Guardar resultado**: `POST /resultados` real contra
  json-server (se guarda en `db.json` mientras el servidor esté corriendo) y
  muestra `<Mascota expresion="feliz" />` de confirmación.
- **Panel admin — Subir a galería**: simula la selección de un archivo
  (`input type="file"`, no se sube el archivo real) y agrega un registro con
  sus metadatos vía `POST /galeria`.

## Qué falta para pasar a producción (Entregable 3)

Todo el frontend ya consume la API a través de `src/api/client.js`, que lee
la URL base de `VITE_API_URL` (definida en `.env`). Cuando exista la API
real en Node.js + Express + PostgreSQL:

1. Cambia `VITE_API_URL` en `.env` a la URL del backend real.
2. Ajusta los endpoints si sus rutas no coinciden 1 a 1 con las de
   json-server (por ejemplo, filtros de query o nombres de recursos).
3. Reemplaza el login simulado del Panel admin (`GET /usuarios_admin` +
   comparación en cliente) por el flujo real de autenticación (JWT, bcrypt)
   que defina el backend.
4. Sustituye la simulación de "Subir a galería" por la subida real de
   archivos (multipart/almacenamiento de imágenes) cuando el backend lo
   soporte.

No hay que rehacer el prototipo: la estructura de componentes, rutas y
llamadas HTTP se mantiene igual.
