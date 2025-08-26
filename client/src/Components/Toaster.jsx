import React, { useEffect } from "react";

const toastColors = {
  success: {
    bg: "rgba(212, 237, 218, 0.95)", // light blue
    text: "#155724", // dark blue
    border: "#c3e6cb",
  },
  error: {
    bg: "rgba(248, 215, 218, 0.95)", // light red
    text: "#721c24",
    border: "#f5c6cb",
  },
  info: {
    bg: "rgba(209, 236, 241, 0.95)", // light blue
    text: "#0c5460",
    border: "#bee5eb",
  },
  warning: {
    bg: "rgba(255, 243, 205, 0.95)", // light yellow
    text: "#856404",
    border: "#ffeeba",
  },
};

export const Toaster = ({ toasts, onRemove }) => {
  useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.duration !== 0) {
        const timer = setTimeout(() => onRemove(toast.id), toast.duration || 3000);
        return () => clearTimeout(timer);
      }
    });
  }, [toasts, onRemove]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "320px",
      }}
    >
      {toasts.map((toast) => {
        const colors = toastColors[toast.type] || toastColors.info;
        return (
          <div
            key={toast.id}
            style={{
              background: colors.bg,
              color: colors.text,
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              fontSize: "14px",
              fontWeight: 500,
              animation: "slideIn 0.3s ease-out",
            }}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => onRemove(toast.id)}
              style={{
                marginLeft: 16,
                background: "transparent",
                border: "none",
                color: colors.text,
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: 18,
                lineHeight: 1,
              }}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};
