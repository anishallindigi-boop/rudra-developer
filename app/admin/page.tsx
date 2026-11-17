"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, blogs: 0, enquiries: 0, newEnq: 0, images: 0 });

  useEffect(() => {
    (async () => {
      try {
        const [p, b, e, i] = await Promise.all([
          adminApi.getProjects(),
          adminApi.getBlogs(),
          adminApi.getEnquiries(),
          adminApi.getImages(),
        ]);
        setStats({
          projects: p.length,
          blogs: b.length,
          enquiries: e.length,
          newEnq: e.filter((x: any) => x.status === "new").length,
          images: i.length,
        });
      } catch {}
    })();
  }, []);

  const cards = [
    { label: "Projects", value: stats.projects, color: "#d11141" },
    { label: "Blog Posts", value: stats.blogs, color: "#c89d54" },
    { label: "Enquiries", value: stats.enquiries, color: "#0ea5e9" },
    { label: "New Enquiries", value: stats.newEnq, color: "#f59e0b" },
    { label: "Images", value: stats.images, color: "#10b981" },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: "#111111", marginBottom: 20 }}>Dashboard Overview</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 24 }}>
        {cards.map((c) => (
          <div key={c.label} style={{ background: "#fff", borderRadius: 14, padding: 20, borderLeft: `4px solid ${c.color}`, boxShadow: "0 4px 14px rgba(0,0,0,.05)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#64748b", marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#111111" }}>{c.value}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 4px 14px rgba(0,0,0,.05)" }}>
        <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Welcome</h2>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>Manage projects, blogs, enquiries and images. Changes reflect on the website via the Express API.</p>
        <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 12 }}>Website: <Link href="/" style={{ color: "#d11141" }}>Home</Link> · API: http://localhost:5000</p>
      </div>
    </div>
  );
}
