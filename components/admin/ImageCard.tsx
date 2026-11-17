export default function ImageCard({
  src,
  filename,
  meta,
  onDelete,
}: {
  src: string;
  filename: string;
  meta: string;
  onDelete: () => void;
}) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 10, boxShadow: "0 4px 14px rgba(0,0,0,.05)" }}>
      <img src={src} alt={filename} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }} />
      <div style={{ fontSize: 11, color: "#64748b", marginTop: 8, wordBreak: "break-all" }}>{filename}</div>
      <div style={{ fontSize: 11, color: "#94a3b8" }}>{meta}</div>
      <button
        onClick={onDelete}
        style={{ marginTop: 8, width: "100%", padding: "8px", borderRadius: 8, background: "#fee2e2", color: "#b91c1c", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}
      >
        Delete
      </button>
    </div>
  );
}
