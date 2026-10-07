import { useState, useRef, useCallback } from "react";
import { PRODUCTOS } from "./data/productos.js";
import Navbar from "./components/Navbar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import CartPanel from "./components/CartPanel.jsx";
import Toasts from "./components/Toasts.jsx";

const MSG_MAX = "Este es el máximo de producto disponible en stock";
const MSG_MIN_CARD = "La cantidad mínima es 1";
const MSG_MIN_CART = "Esta es la cantidad mínima. ¿Desea eliminar el producto?";

export default function App() {
  const [cart, setCart] = useState([]); // [{ id, cantidad }]
  const [open, setOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const closeToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const toast = useCallback((msg, action) => {
    const id = ++nextId.current;
    setToasts((t) => [...t, { id, msg, action }]);
    setTimeout(() => closeToast(id), action ? 7000 : 4000);
  }, [closeToast]);

  const enCarrito = (id) => cart.find((l) => l.id === id)?.cantidad ?? 0;
  const guardar = (id, cantidad) =>
    setCart((c) => c.some((l) => l.id === id)
      ? c.map((l) => (l.id === id ? { ...l, cantidad } : l))
      : [...c, { id, cantidad }]);
  const quitar = (id) => setCart((c) => c.filter((l) => l.id !== id));

  const agregar = (p, qty) => {
    const total = enCarrito(p.id) + qty;
    if (total > p.stock) toast(MSG_MAX);
    guardar(p.id, Math.min(total, p.stock));
  };
  const setQty = (l, n) => {
    if (n > l.stock) { toast(MSG_MAX); n = l.stock; }
    guardar(l.id, n);
  };
  const avisoMinimo = (l) => toast(MSG_MIN_CART, { label: "Eliminar", run: () => quitar(l.id) });
  const restar = (l) => (l.cantidad <= 1 ? avisoMinimo(l) : guardar(l.id, l.cantidad - 1));
  const sumar = (l) => (l.cantidad >= l.stock ? toast(MSG_MAX) : guardar(l.id, l.cantidad + 1));

  const lineas = cart.map((l) => ({ ...PRODUCTOS.find((p) => p.id === l.id), cantidad: l.cantidad }));
  const totalUnidades = lineas.reduce((s, l) => s + l.cantidad, 0);
  const total = lineas.reduce((s, l) => s + l.precio * l.cantidad, 0);

  return (
    <>
      <Navbar unidades={totalUnidades} onOpenCart={() => setOpen(true)} />
      <main className="catalog">
        {PRODUCTOS.map((p) => (
          <ProductCard
            key={p.id}
            producto={p}
            enCarrito={enCarrito(p.id)}
            onAdd={agregar}
            onMaxStock={() => toast(MSG_MAX)}
            onMinQty={() => toast(MSG_MIN_CARD)}
          />
        ))}
      </main>
      <CartPanel
        open={open}
        lineas={lineas}
        totalUnidades={totalUnidades}
        total={total}
        onClose={() => setOpen(false)}
        onSetQty={setQty}
        onMinus={restar}
        onPlus={sumar}
        onMin={avisoMinimo}
        onRemove={quitar}
      />
      <Toasts toasts={toasts} onClose={closeToast} />
    </>
  );
}
