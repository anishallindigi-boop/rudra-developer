"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { deleteImage } from "@/lib/redux/slice/ImageSlice";
import ImageUploadModal from "@/components/admin/ImageUploadModal";
import ImageCard from "@/components/admin/ImageCard";
import { AdminPageHeader } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export default function AdminImages() {
  const dispatch = useAppDispatch();
  const { images, loading, message, error } = useAppSelector((s: RootState) => s.image);
  const [open, setOpen] = useState(false);
  const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace("/api", "");

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (message) toast.success(message);
  }, [message]);

  async function handleDelete(filename: string) {
    if (!confirm("Delete this image?")) return;
    try {
      const res = await dispatch(deleteImage(filename)).unwrap();
      toast.success(res?.message || "Image deleted");
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Images"
        action={
          <Button className="cursor-pointer" onClick={() => setOpen(true)}>
            <Upload className="w-4 h-4" />
            Upload Image
          </Button>
        }
      />

      <div style={{ background: "#fff", borderRadius: 14, padding: 20, marginBottom: 24, boxShadow: "0 4px 14px rgba(0,0,0,.05)" }}>
        <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Upload Image</h2>
        <p style={{ fontSize: 13, color: "#64748b" }}>
          Use the <strong>Upload Image</strong> button above to open the image library — drag &amp; drop or browse, then select the image(s) you want to use.
        </p>
      </div>

      {loading && <div style={{ color: "#64748b" }}>Loading...</div>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
        {images.map((img) => (
          <ImageCard
            key={img.filename}
            src={`${apiBase}${img.url}`}
            filename={img.filename}
            meta={`${img.folder} · ${Math.round((img.bytes || img.size || 0) / 1024)} KB`}
            onDelete={() => handleDelete(img.filename)}
          />
        ))}
        {images.length === 0 && (
          <div style={{ color: "#94a3b8", gridColumn: "1/-1", textAlign: "center", padding: 24 }}>
            No images yet
          </div>
        )}
      </div>

      <ImageUploadModal
        open={open}
        onSelect={() => setOpen(false)}
        onClose={() => setOpen(false)}
        multiple={false}
      />
    </div>
  );
}
