"use client";
import type { CSSProperties, ReactNode } from "react";

export const inputStyle: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #e2e8f0",
  borderRadius: 10,
  fontSize: 14,
};

export const labelStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: ".12em",
  color: "#64748b",
  marginBottom: 6,
  display: "block",
};

export const primaryButtonStyle: CSSProperties = {
  padding: "8px 16px",
  borderRadius: 999,
  background: "#d11141",
  color: "#fff",
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
};

/** Page title row with optional action button. */
export function AdminPageHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: "#111111" }}>{title}</h1>
      {action}
    </div>
  );
}

/** Label + control wrapper for admin forms. */
export function FormField({
  label,
  children,
  span = false,
}: {
  label: string;
  children: ReactNode;
  span?: boolean;
}) {
  return (
    <div style={span ? { gridColumn: "1 / -1" } : undefined}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

/** Edit / Delete action pair used in admin tables. */
export function ActionButtons({
  onEdit,
  onDelete,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {onEdit && (
        <button
          onClick={onEdit}
          style={{ padding: "6px 12px", borderRadius: 8, background: "#f1f5f9", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}
        >
          Edit
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          style={{ padding: "6px 12px", borderRadius: 8, background: "#fee2e2", color: "#b91c1c", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}
        >
          Delete
        </button>
      )}
    </div>
  );
}

export type AdminColumn<T> = {
  header: string;
  cell: (row: T) => ReactNode;
  style?: CSSProperties;
};

/** Shared admin data table (projects, blogs, enquiries). */
export function AdminTable<T>({
  columns,
  rows,
  loading = false,
  emptyText,
}: {
  columns: AdminColumn<T>[];
  rows: T[];
  loading?: boolean;
  emptyText: string;
}) {
  return (
    <>
      {loading && <div style={{ color: "#64748b", marginBottom: 8 }}>Loading...</div>}
      <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,.05)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {columns.map((column) => (
                <th
                  key={column.header}
                  style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em", color: "#64748b" }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const record = row as Record<string, unknown>;
              const key = String(record._id ?? record.slug ?? index);
              return (
                <tr key={key} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  {columns.map((column) => (
                    <td key={column.header} style={{ padding: "12px 14px", ...column.style }}>
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: "center", color: "#94a3b8", padding: 24 }}>
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
