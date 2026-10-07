export default function Navbar({ unidades, onOpenCart }) {
  return (
    <header className="navbar">
      <h1 className="brand">Tienda Palmira</h1>
      <button className="cart-btn" aria-label={`Abrir carrito, ${unidades} unidades`} onClick={onOpenCart}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
          <path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h9.4a1 1 0 0 0 1-.8L21 7H6" />
        </svg>
        {unidades > 0 && <span className="badge">{unidades}</span>}
      </button>
    </header>
  );
}
