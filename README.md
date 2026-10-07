# Carrito de Compras – Tienda Palmira

- **Aprendiz:** Santiago Morales Plazas
- **Programa / Ficha:** Análisis y Desarrollo de Software (ADSO) – 3400626
- **Instructor:** Daniel Alfonso Martínez Payán
- **Tecnología:** React 18 + Vite
- **Repositorio:** <PEGAR_AQUÍ_EL_ENLACE_DEL_REPOSITORIO_PÚBLICO>

## Instalar y ejecutar

```bash
git clone <enlace-del-repositorio>
cd Morales_Santiago_CarritoReact
npm install
npm run dev
```

Abrir la URL que muestra la terminal (normalmente http://localhost:5173).

## Estructura

- `src/data/productos.js` – catálogo (array JSON)
- `src/components/QuantityInput.jsx` – campo de cantidad con validaciones (teclas, pegado, rueda, 0)
- `src/components/Toasts.jsx` – avisos emergentes (se cierran solos o con ×)
- `src/components/` – `Navbar`, `ProductCard`, `CartPanel`
- `src/App.jsx` – estado del carrito, reglas de stock y mínimo

## Evidencias

| # | Funcionalidad | Captura | ¿Funciona? |
|---|---------------|---------|------------|
| 1 | Navbar e ícono con contador | evidencias/01-navbar.png | Sí |
| 2 | Agregar producto desde el catálogo | evidencias/02-agregar.png | Sí |
| 3 | Bloqueo de "e", negativos y 0 | evidencias/03-validaciones.png | Sí |
| 4 | Toast de stock máximo | evidencias/04-toast-maximo.png | Sí |
| 5 | Toast de cantidad mínima con opción de eliminar | evidencias/05-toast-minimo.png | Sí |
| 6 | Subtotales y total con varios productos | evidencias/06-totales.png | Sí |
| 7 | Producto eliminado y total recalculado | evidencias/07-eliminado.png | Sí |
