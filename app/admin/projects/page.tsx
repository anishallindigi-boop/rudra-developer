"use client";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import ProjectForm from "@/components/admin/ProjectForm";

const EMPTY_FORM = {
  name: "", slug: "", badge: "", location: "", description: "", overview: "", image: "",
  homebanner: "", bannerlogo: "", bannerheading: "", brochurepdf: "", aboutheading: "", aboutsubheading: "",
  aboutslideimages: [], aboutpara1: "", aboutpara2: "", abountpointone: "", abountpointtwo: "", abountpointthree: "", abountpointfour: "",
  glimpse: [], immersivetour: [], premiereoffering: [], brochureimage: "", brochuretitle: "", brochurepara: "", connectivity: "",
  status: "publish", area: "", totalUnits: "", plotSizes: "", reraNo: "", policy: "", amenities: [], chips: [], featured: true, order: 0,
};

export default function AdminProjects() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [formData, setFormData] = useState<any>({ ...EMPTY_FORM });
  const [glimpses, setGlimpses] = useState<any[]>([]);
  const [immersives, setImmersives] = useState<any[]>([]);
  const [premiereTabs, setPremiereTabs] = useState<any[]>([]);
  // submitting state removed (unused)

  async function load() { setLoading(true); try { setItems(await adminApi.getProjects()); } catch (e: any) { alert(e.message); } finally { setLoading(false); } }
  useEffect(() => { load(); }, []);

  function openNew() {
    setFormData({ ...EMPTY_FORM });
    setGlimpses([]);
    setImmersives([]);
    setPremiereTabs([]);
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(p: any) {
    setFormData({
      ...EMPTY_FORM, ...p,
      amenities: p.amenities || [],
      chips: p.chips || [],
      aboutslideimages: p.aboutslideimages || [],
    });
    setGlimpses(p.glimpse || []);
    setImmersives(p.immersivetour || []);
    setPremiereTabs(p.premiereoffering || []);
    setEditing(p);
    setShowForm(true);
  }

  function close() { setShowForm(false); setEditing(null); }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...formData,
      amenities: Array.isArray(formData.amenities) ? formData.amenities : String(formData.amenities || "").split("\n").map((s: string) => s.trim()).filter(Boolean),
      chips: Array.isArray(formData.chips) ? formData.chips : String(formData.chips || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      aboutslideimages: Array.isArray(formData.aboutslideimages) ? formData.aboutslideimages : String(formData.aboutslideimages || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      glimpse: glimpses,
      immersivetour: immersives,
      premiereoffering: premiereTabs,
    };
    try {
      if (editing) await adminApi.updateProject(editing.slug, payload);
      else await adminApi.createProject(payload);
      close(); load();
    } catch (err: any) { alert(err.message); }
  }

  async function handleDelete(slug: string) {
    if (!confirm("Delete this project?")) return;
    try { await adminApi.deleteProject(slug); load(); } catch (err: any) { alert(err.message); }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: "#111111" }}>Projects</h1>
        <button onClick={openNew} style={{ padding: "8px 16px", borderRadius: 999, background: "#d11141", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>+ New Project</button>
      </div>

      {showForm && (
        <div style={{ background: "#fff", borderRadius: 14, marginBottom: 24, boxShadow: "0 4px 14px rgba(0,0,0,.05)", overflow: "hidden" }}>
          <ProjectForm
            formData={formData}
            setFormData={setFormData}
            glimpses={glimpses}
            setGlimpses={setGlimpses}
            immersives={immersives}
            setImmersives={setImmersives}
            premiereTabs={premiereTabs}
            setPremiereTabs={setPremiereTabs}
            onSubmit={onSubmit}
            isEdit={!!editing}
          />
        </div>
      )}

      {loading && <div style={{ color: "#64748b" }}>Loading...</div>}
      <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,.05)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#f8fafc" }}>
            {["Name", "Location", "RERA", "Featured", "Actions"].map((h) => <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em", color: "#64748b" }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {items.map((p: any) => (
              <tr key={p._id || p.slug} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 14px", fontWeight: 700 }}>{p.name}</td>
                <td style={{ padding: "12px 14px" }}>{p.location}</td>
                <td style={{ padding: "12px 14px", fontSize: 12 }}>{p.reraNo}</td>
                <td style={{ padding: "12px 14px" }}>{p.featured ? "Yes" : "No"}</td>
                <td style={{ padding: "12px 14px", display: "flex", gap: 6 }}>
                  <button onClick={() => openEdit(p)} style={{ padding: "6px 12px", borderRadius: 8, background: "#f1f5f9", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Edit</button>
                  <button onClick={() => handleDelete(p.slug)} style={{ padding: "6px 12px", borderRadius: 8, background: "#fee2e2", color: "#b91c1c", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={5} style={{ textAlign: "center", color: "#94a3b8", padding: 24 }}>No projects yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
