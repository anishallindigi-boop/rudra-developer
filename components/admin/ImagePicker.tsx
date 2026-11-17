"use client";
import React, { useState } from "react";
import ImageUploadModal from "./ImageUploadModal";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImagePicker({ value, onChange, label }: Props) {
  const [open, setOpen] = useState(false);

  const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace("/api", "");
  const preview = value ? (value.startsWith("http") ? value : `${apiBase}${value.startsWith("/") ? "" : "/"}${value}`) : "";

  const handleSelect = (urls: string[]) => {
    onChange(urls[0] || "");
    setOpen(false);
  };

  return (
    <div>
      {label && (
        <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#64748b", marginBottom: 6, display: "block" }}>
          {label}
        </label>
      )}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="image url or pick →"
          style={{ flex: 1, padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 14 }}
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 13 }}
        >
          Pick / Upload
        </button>
      </div>
      {preview && (
        <img
          src={preview}
          alt={label || "preview"}
          style={{ marginTop: 8, height: 60, borderRadius: 8, objectFit: "cover" }}
        />
      )}
      <ImageUploadModal
        open={open}
        onSelect={handleSelect}
        onClose={() => setOpen(false)}
        multiple={false}
      />
    </div>
  );
}
