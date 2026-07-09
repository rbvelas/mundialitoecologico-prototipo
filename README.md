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
