"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { adminApi } from "@/lib/adminApi";
import ImagePicker from "@/components/admin/ImagePicker";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const EMPTY = { title: "", slug: "", excerpt: "", content: "", coverImage: "", images: "", metatitle: "", metadescription: "", metakeywords: "", category: "", author: "", tags: "", published: true };

export default function AdminBlogs() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(EMPTY);

  async function load() { setLoading(true); try { setItems(await adminApi.getBlogs()); } catch (e: any) { alert(e.message); } finally { setLoading(false); } }
  useEffect(() => { load(); }, []);

  function openNew() { setForm({ ...EMPTY }); setEditing(null); setShowForm(true); }
  function openEdit(b: any) { setForm({ ...b, tags: (b.tags || []).join(", ") }); setEditing(b); setShowForm(true); }
  function close() { setShowForm(false); setEditing(null); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload: any = {
      ...form,
      tags: form.tags.split(",").map((s: string) => s.trim()).filter(Boolean),
      category: form.category.split(",").map((s: string) => s.trim()).filter(Boolean),
    };
    if (!payload.images) delete payload.images;
    try { if (editing) await adminApi.updateBlog(editing.slug, payload); else await adminApi.createBlog(payload); close(); load(); } catch (err: any) { alert(err.message); }
  }

  async function handleDelete(slug: string) { if (!confirm("Delete this blog?")) return; try { await adminApi.deleteBlog(slug); load(); } catch (err: any) { alert(err.message); } }

  const inputStyle = { width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 14 };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: "#111111" }}>Blog Posts</h1>
        <button onClick={openNew} style={{ padding: "8px 16px", borderRadius: 999, background: "#d11141", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>+ New Post</button>
      </div>
      {showForm && (
        <div style={{ background: "#fff", borderRadius: 14, padding: 20, marginBottom: 24, boxShadow: "0 4px 14px rgba(0,0,0,.05)" }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>{editing ? "Edit Post" : "New Post"}</h2>
          <form onSubmit={submit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#64748b", marginBottom: 6, display: "block" }}>Title *</label><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#64748b", marginBottom: 6, display: "block" }}>Slug</label><input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} style={inputStyle} /></div>
              <ImagePicker label="Cover Image" value={form.coverImage} onChange={(v) => setForm({ ...form, coverImage: v })} />
              <ImagePicker label="Images" value={form.images} onChange={(v) => setForm({ ...form, images: v })} />
              <div><label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#64748b", marginBottom: 6, display: "block" }}>Meta Title</label><input value={form.metatitle} onChange={(e) => setForm({ ...form, metatitle: e.target.value })} style={inputStyle} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#64748b", marginBottom: 6, display: "block" }}>Meta Keywords</label><input value={form.metakeywords} onChange={(e) => setForm({ ...form, metakeywords: e.target.value })} style={inputStyle} /></div>
              <div style={{ gridColumn: "1 / -1" }}><label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#64748b", marginBottom: 6, display: "block" }}>Meta Description</label><textarea value={form.metadescription} onChange={(e) => setForm({ ...form, metadescription: e.target.value })} style={{ ...inputStyle, minHeight: 60, resize: "vertical" }} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#64748b", marginBottom: 6, display: "block" }}>Tags (comma)</label><input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} style={inputStyle} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#64748b", marginBottom: 6, display: "block" }}>Category (comma ids)</label><input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputStyle} /></div>
              <div><label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#64748b", marginBottom: 6, display: "block" }}>Author (id)</label><input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} style={inputStyle} /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 26 }}><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /><label style={{ fontSize: 13, fontWeight: 600 }}>Published</label></div>
            </div>
            <div style={{ marginTop: 14 }}><label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#64748b", marginBottom: 6, display: "block" }}>Excerpt</label><textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} style={{ ...inputStyle, minHeight: 60, resize: "vertical" }} /></div>
            <div style={{ marginTop: 14 }}><label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#64748b", marginBottom: 6, display: "block" }}>Content (Jodit)</label>
              <JoditEditor value={form.content} onChange={(v: string) => setForm({ ...form, content: v })} />
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
              <button type="submit" style={{ padding: "10px 20px", borderRadius: 999, background: "#d11141", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>{editing ? "Update" : "Create"}</button>
              <button type="button" onClick={close} style={{ padding: "10px 20px", borderRadius: 999, background: "#fff", color: "#111111", fontWeight: 700, border: "1px solid #e2e8f0", cursor: "pointer" }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {loading && <div style={{ color: "#64748b" }}>Loading...</div>}
      <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,.05)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#f8fafc" }}>{["Title", "Slug", "Published", "Actions"].map((h) => <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em", color: "#64748b" }}>{h}</th>)}</tr></thead>
          <tbody>
            {items.map((b: any) => (
              <tr key={b._id || b.slug} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 14px", fontWeight: 700 }}>{b.title}</td>
                <td style={{ padding: "12px 14px", fontSize: 12 }}>{b.slug}</td>
                <td style={{ padding: "12px 14px" }}>{b.published ? "Yes" : "Draft"}</td>
                <td style={{ padding: "12px 14px", display: "flex", gap: 6 }}>
                  <button onClick={() => openEdit(b)} style={{ padding: "6px 12px", borderRadius: 8, background: "#f1f5f9", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Edit</button>
                  <button onClick={() => handleDelete(b.slug)} style={{ padding: "6px 12px", borderRadius: 8, background: "#fee2e2", color: "#b91c1c", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={4} style={{ textAlign: "center", color: "#94a3b8", padding: 24 }}>No posts yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
