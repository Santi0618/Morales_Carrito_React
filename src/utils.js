const fmt = new Intl.NumberFormat("es-CO", {
  style: "currency", currency: "COP", maximumFractionDigits: 0,
});
export const formatCOP = (n) => fmt.format(n);
