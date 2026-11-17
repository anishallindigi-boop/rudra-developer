"use client";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import ProjectForm from "@/components/admin/ProjectForm";
import {
  ActionButtons,
  AdminPageHeader,
  AdminTable,
  primaryButtonStyle,
  type AdminColumn,
} from "@/components/admin/AdminUI";

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

  async function load() {
    setLoading(true);
    try { setItems(await adminApi.getProjects()); }
    catch (e: any) { alert(e.message); }
    finally { setLoading(false); }
  }
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
      ...EMPTY_FORM,
      ...p,
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

  function close() {
    setShowForm(false);
    setEditing(null);
  }

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
      close();
      load();
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("Delete this project?")) return;
    try { await adminApi.deleteProject(slug); load(); }
    catch (err: any) { alert(err.message); }
  }

  const columns: AdminColumn<any>[] = [
    { header: "Name", cell: (p) => <span style={{ fontWeight: 700 }}>{p.name}</span> },
    { header: "Location", cell: (p) => p.location },
    { header: "RERA", cell: (p) => <span style={{ fontSize: 12 }}>{p.reraNo}</span> },
    { header: "Featured", cell: (p) => (p.featured ? "Yes" : "No") },
    {
      header: "Actions",
      cell: (p) => (
        <ActionButtons onEdit={() => openEdit(p)} onDelete={() => handleDelete(p.slug)} />
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Projects"
        action={
          <button onClick={openNew} style={primaryButtonStyle}>
            + New Project
          </button>
        }
      />

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

      <AdminTable
        columns={columns}
        rows={items}
        loading={loading}
        emptyText="No projects yet"
      />
    </div>
  );
}
