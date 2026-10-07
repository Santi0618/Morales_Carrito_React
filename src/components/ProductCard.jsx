import { useState } from "react";
import QuantityInput from "./QuantityInput.jsx";
import { formatCOP } from "../utils.js";

export default function ProductCard({ producto, enCarrito, onAdd, onMaxStock, onMinQty }) {
  const [cantidad, setCantidad] = useState(1);
  const disponible = producto.stock - enCarrito;

  const cambiar = (n) => {
    if (n > producto.stock) { onMaxStock(); n = producto.stock; }
    setCantidad(n);
  };

  return (
    <article className="card">
      <h2>{producto.nombre}</h2>
      <p className="price">{formatCOP(producto.precio)}</p>
      <p className="stock">Stock disponible: {producto.stock}</p>
      <div className="card-actions">
        <QuantityInput
          label={`Cantidad de ${producto.nombre}`}
          value={cantidad}
          onChange={cambiar}
          onMin={onMinQty}
        />
        <button
          className="btn-add"
          disabled={disponible <= 0}
          onClick={() => { onAdd(producto, cantidad); setCantidad(1); }}
        >
          {disponible <= 0 ? "Sin unidades" : "Agregar"}
        </button>
      </div>
    </article>
  );
}
