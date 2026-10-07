import QuantityInput from "./QuantityInput.jsx";
import { formatCOP } from "../utils.js";

export default function CartPanel({ open, lineas, totalUnidades, total, onClose, onSetQty, onMinus, onPlus, onMin, onRemove }) {
  return (
    <>
      {open && <div className="overlay" onClick={onClose} />}
      <aside className={`cart ${open ? "open" : ""}`} aria-hidden={!open} aria-label="Carrito de compras">
        <div className="cart-head">
          <h2>Tu carrito</h2>
          <button className="icon-btn" aria-label="Cerrar carrito" onClick={onClose}>×</button>
        </div>

        <div className="cart-body">
          {lineas.length === 0 && <p className="empty">Aún no agregas productos. Elige uno del catálogo.</p>}
          {lineas.map((l) => (
            <div key={l.id} className="line">
              <div className="line-top">
                <strong>{l.nombre}</strong>
                <button className="icon-btn danger" aria-label={`Quitar ${l.nombre}`} onClick={() => onRemove(l.id)}>🗑</button>
              </div>
              <div className="line-bottom">
                <div className="stepper">
                  <button aria-label={`Restar una unidad de ${l.nombre}`} onClick={() => onMinus(l)}>−</button>
                  <QuantityInput
                    label={`Cantidad de ${l.nombre} en el carrito`}
                    value={l.cantidad}
                    onChange={(n) => onSetQty(l, n)}
                    onMin={() => onMin(l)}
                  />
                  <button aria-label={`Sumar una unidad de ${l.nombre}`} onClick={() => onPlus(l)}>+</button>
                </div>
                <div className="subtotal">
                  <small>{formatCOP(l.precio)} c/u</small>
                  <span>{formatCOP(l.precio * l.cantidad)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-foot">
          <p><span>Total de unidades</span><strong>{totalUnidades}</strong></p>
          <p className="total"><span>Total de la compra</span><strong>{formatCOP(total)}</strong></p>
        </div>
      </aside>
    </>
  );
}
