export default function Toasts({ toasts, onClose }) {
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          <span>{t.msg}</span>
          {t.action && (
            <button
              className="toast-action"
              onClick={() => { t.action.run(); onClose(t.id); }}
            >
              {t.action.label}
            </button>
          )}
          <button className="toast-x" aria-label="Cerrar aviso" onClick={() => onClose(t.id)}>×</button>
        </div>
      ))}
    </div>
  );
}
