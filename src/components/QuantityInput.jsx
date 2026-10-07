import { useState } from "react";

const TECLAS_BLOQUEADAS = ["e", "E", "+", "-", ".", ","];

// Campo de cantidad reutilizable (catálogo y carrito).
// onChange(n) recibe solo enteros >= 1. onMin() se llama al intentar 0.
export default function QuantityInput({ value, onChange, onMin, label }) {
  const [borrador, setBorrador] = useState(null); // permite vaciar el campo mientras se escribe

  const handleChange = (e) => {
    const raw = e.target.value;
    if (raw === "") return setBorrador("");
    if (!/^\d+$/.test(raw)) return;
    const n = parseInt(raw, 10);
    setBorrador(null);
    if (n < 1) return onMin();
    onChange(n);
  };

  const handlePaste = (e) => {
    const texto = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(texto)) e.preventDefault();
  };

  return (
    <input
      type="number"
      className="qty-input"
      aria-label={label}
      min={1}
      step={1}
      value={borrador ?? value}
      onKeyDown={(e) => TECLAS_BLOQUEADAS.includes(e.key) && e.preventDefault()}
      onPaste={handlePaste}
      onChange={handleChange}
      onBlur={() => setBorrador(null)}
      onWheel={(e) => e.target.blur()}
    />
  );
}
