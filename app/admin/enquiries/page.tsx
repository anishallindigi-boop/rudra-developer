"use client";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";

export default function AdminEnquiries() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() { setLoading(true); try { setItems(await adminApi.getEnquiries()); } catch (e: any) { alert(e.message); } finally { setLoading(false); } }
  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: string) {
    try { await adminApi.updateEnquiry(id, status); load(); } catch (e: any) { alert(e.message); }
  }
  async function handleDelete(id: string) {
    if (!confirm("Delete?")) return;
    try { await adminApi.deleteEnquiry(id); load(); } catch (e: any) { alert(e.message); }
  }

  const color = (s: string) => s === "new" ? "#fef3c7" : s === "contacted" ? "#dbeafe" : "#dcfce7";
  const tcolor = (s: string) => s === "new" ? "#92400e" : s === "contacted" ? "#1e40af" : "#166534";

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: "#111111", marginBottom: 20 }}>Enquiries</h1>
      {loading && <div style={{ color: "#64748b" }}>Loading...</div>}
      <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,.05)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#f8fafc" }}>{["Name", "Phone", "Project", "Message", "Status", "Date", "Actions"].map((h) => <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em", color: "#64748b" }}>{h}</th>)}</tr></thead>
          <tbody>
            {items.map((e: any) => (
              <tr key={e._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 14px", fontWeight: 700 }}>{e.name}</td>
                <td style={{ padding: "12px 14px" }}>{e.phone}</td>
                <td style={{ padding: "12px 14px" }}>{e.project}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, maxWidth: 200 }}>{e.message}</td>
                <td style={{ padding: "12px 14px" }}>
                  <select value={e.status} onChange={(ev) => updateStatus(e._id, ev.target.value)} style={{ padding: "4px 8px", fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0", background: color(e.status), color: tcolor(e.status), fontWeight: 700 }}>
                    <option value="new">new</option><option value="contacted">contacted</option><option value="closed">closed</option>
                  </select>
                </td>
                <td style={{ padding: "12px 14px", fontSize: 12 }}>{new Date(e.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: "12px 14px" }}><button onClick={() => handleDelete(e._id)} style={{ padding: "6px 12px", borderRadius: 8, background: "#fee2e2", color: "#b91c1c", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Delete</button></td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={7} style={{ textAlign: "center", color: "#94a3b8", padding: 24 }}>No enquiries yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
