"use client";
import dynamic from "next/dynamic";
import ImagePicker from "./ImagePicker";
import { FormField, inputStyle } from "./AdminUI";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export type BlogFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  images: string;
  metatitle: string;
  metadescription: string;
  metakeywords: string;
  category: string;
  author: string;
  tags: string;
  published: boolean;
};

/** Blog create/edit form (state lives in the page). */
export default function BlogForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEdit,
}: {
  form: BlogFormValues;
  onChange: (patch: Partial<BlogFormValues>) => void;
  onSubmit: (event: React.FormEvent) => void;
  onCancel: () => void;
  isEdit: boolean;
}) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 20, marginBottom: 24, boxShadow: "0 4px 14px rgba(0,0,0,.05)" }}>
      <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>
        {isEdit ? "Edit Post" : "New Post"}
      </h2>
      <form onSubmit={onSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <FormField label="Title *">
            <input required value={form.title} onChange={(e) => onChange({ title: e.target.value })} style={inputStyle} />
          </FormField>
          <FormField label="Slug">
            <input value={form.slug} onChange={(e) => onChange({ slug: e.target.value })} style={inputStyle} />
          </FormField>

          <ImagePicker label="Cover Image" value={form.coverImage} onChange={(v) => onChange({ coverImage: v })} />
          <ImagePicker label="Images" value={form.images} onChange={(v) => onChange({ images: v })} />

          <FormField label="Meta Title">
            <input value={form.metatitle} onChange={(e) => onChange({ metatitle: e.target.value })} style={inputStyle} />
          </FormField>
          <FormField label="Meta Keywords">
            <input value={form.metakeywords} onChange={(e) => onChange({ metakeywords: e.target.value })} style={inputStyle} />
          </FormField>

          <FormField label="Meta Description" span>
            <textarea
              value={form.metadescription}
              onChange={(e) => onChange({ metadescription: e.target.value })}
              style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
            />
          </FormField>

          <FormField label="Tags (comma)">
            <input value={form.tags} onChange={(e) => onChange({ tags: e.target.value })} style={inputStyle} />
          </FormField>
          <FormField label="Category (comma ids)">
            <input value={form.category} onChange={(e) => onChange({ category: e.target.value })} style={inputStyle} />
          </FormField>

          <FormField label="Author (id)">
            <input value={form.author} onChange={(e) => onChange({ author: e.target.value })} style={inputStyle} />
          </FormField>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 26 }}>
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => onChange({ published: e.target.checked })}
            />
            <label style={{ fontSize: 13, fontWeight: 600 }}>Published</label>
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <FormField label="Excerpt">
            <textarea
              value={form.excerpt}
              onChange={(e) => onChange({ excerpt: e.target.value })}
              style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
            />
          </FormField>
        </div>

        <div style={{ marginTop: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#64748b", marginBottom: 6, display: "block" }}>
            Content (Jodit)
          </label>
          <JoditEditor value={form.content} onChange={(v: string) => onChange({ content: v })} />
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <button
            type="submit"
            style={{ padding: "10px 20px", borderRadius: 999, background: "#d11141", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}
          >
            {isEdit ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{ padding: "10px 20px", borderRadius: 999, background: "#fff", color: "#111111", fontWeight: 700, border: "1px solid #e2e8f0", cursor: "pointer" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
