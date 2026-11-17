"use client";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import BlogForm, { type BlogFormValues } from "@/components/admin/BlogForm";
import {
  ActionButtons,
  AdminPageHeader,
  AdminTable,
  primaryButtonStyle,
  type AdminColumn,
} from "@/components/admin/AdminUI";

const EMPTY: BlogFormValues = {
  title: "", slug: "", excerpt: "", content: "", coverImage: "", images: "",
  metatitle: "", metadescription: "", metakeywords: "", category: "", author: "",
  tags: "", published: true,
};

const toList = (value: unknown) =>
  Array.isArray(value)
    ? value
    : String(value || "").split(",").map((s) => s.trim()).filter(Boolean);

export default function AdminBlogs() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<BlogFormValues>(EMPTY);

  async function load() {
    setLoading(true);
    try { setItems(await adminApi.getBlogs()); }
    catch (e: any) { alert(e.message); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  function openNew() {
    setForm({ ...EMPTY });
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(b: any) {
    setForm({
      ...EMPTY,
      ...b,
      tags: (b.tags || []).join(", "),
      category: (b.category || []).join(", "),
    });
    setEditing(b);
    setShowForm(true);
  }

  function close() {
    setShowForm(false);
    setEditing(null);
  }

  function patch(update: Partial<BlogFormValues>) {
    setForm((prev) => ({ ...prev, ...update }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload: any = {
      ...form,
      tags: toList(form.tags),
      category: toList(form.category),
    };
    if (!payload.images) delete payload.images;
    try {
      if (editing) await adminApi.updateBlog(editing.slug, payload);
      else await adminApi.createBlog(payload);
      close();
      load();
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("Delete this blog?")) return;
    try { await adminApi.deleteBlog(slug); load(); }
    catch (err: any) { alert(err.message); }
  }

  const columns: AdminColumn<any>[] = [
    { header: "Title", cell: (b) => <span style={{ fontWeight: 700 }}>{b.title}</span> },
    { header: "Slug", cell: (b) => <span style={{ fontSize: 12 }}>{b.slug}</span> },
    { header: "Published", cell: (b) => (b.published ? "Yes" : "Draft") },
    {
      header: "Actions",
      cell: (b) => (
        <ActionButtons onEdit={() => openEdit(b)} onDelete={() => handleDelete(b.slug)} />
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Blog Posts"
        action={
          <button onClick={openNew} style={primaryButtonStyle}>
            + New Post
          </button>
        }
      />

      {showForm && (
        <BlogForm
          form={form}
          onChange={patch}
          onSubmit={submit}
          onCancel={close}
          isEdit={!!editing}
        />
      )}

      <AdminTable
        columns={columns}
        rows={items}
        loading={loading}
        emptyText="No posts yet"
      />
    </div>
  );
}
