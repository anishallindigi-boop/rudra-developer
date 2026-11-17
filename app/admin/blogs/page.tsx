"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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

const slugify = (value: string) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Mongo ObjectId check — empty strings / random text must not be sent to the API. */
const isObjectId = (value: unknown) =>
  typeof value === "string" && /^[a-f\d]{24}$/i.test(value);

export default function AdminBlogs() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<BlogFormValues>(EMPTY);

  async function load() {
    setLoading(true);
    try { setItems(await adminApi.getBlogs()); }
    catch (e: any) { toast.error(e?.message || "Blogs load nahi ho paaye"); }
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
      coverImage: b.coverImage || b.images || "",
      tags: toList(b.tags).join(", "),
      category: toList(b.category).join(", "),
      published: b.published ?? b.status !== "draft",
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
    const title = form.title.trim();
    const payload: any = {
      title,
      slug: form.slug.trim() || slugify(title),
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      images: form.images,
      metatitle: form.metatitle,
      metadescription: form.metadescription,
      metakeywords: form.metakeywords,
      tags: toList(form.tags),
      category: toList(form.category).filter(isObjectId),
      published: form.published,
      status: form.published ? "active" : "draft",
    };
    // author is an ObjectId ref — sending "" makes Mongoose cast fail.
    if (isObjectId(form.author)) payload.author = form.author;

    try {
      if (editing) await adminApi.updateBlog(editing.slug, payload);
      else await adminApi.createBlog(payload);
      toast.success(editing ? "Blog updated" : "Blog published");
      close();
      load();
    } catch (err: any) {
      toast.error(err?.message || "Blog save nahi ho paaya");
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("Delete this blog?")) return;
    try { await adminApi.deleteBlog(slug); toast.success("Blog deleted"); load(); }
    catch (err: any) { toast.error(err?.message || "Delete failed"); }
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
