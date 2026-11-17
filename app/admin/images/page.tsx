"use client";

import { useEffect, useState } from "react";
import { ImageIcon, Upload } from "lucide-react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { deleteImage, getImages } from "@/lib/redux/slice/ImageSlice";
import { imageSrc } from "@/lib/imageUrl";
import { AdminPageHeader } from "@/components/admin/AdminUI";
import ImageUploadModal from "@/components/admin/ImageUploadModal";
import ImageCard from "@/components/admin/ImageCard";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/button";

export default function AdminImages() {
  const dispatch = useAppDispatch();
  const { images, loading } = useAppSelector((s: RootState) => s.image);
  const [open, setOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    dispatch(getImages())
      .unwrap()
      .catch(() => {});
  }, [dispatch]);

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(imageSrc(url));
      toast.success("Image URL copied");
    } catch {
      toast.error("Copy nahi ho paaya");
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await dispatch(deleteImage(pendingDelete)).unwrap();
      toast.success("Image deleted");
      setPendingDelete(null);
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  const pendingImage = images.find((img) => img.filename === pendingDelete);

  return (
    <div>
      <AdminPageHeader
        title="Images"
        action={
          <Button className="cursor-pointer" onClick={() => setOpen(true)}>
            <Upload className="h-4 w-4" />
            Upload Image
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-slate-500">
          {images.length} image{images.length === 1 ? "" : "s"} · hover karke URL copy
          ya delete karein
        </p>
        {images.length > 0 && (
          <span className="rounded-full bg-alabaster px-3 py-1 text-[11px] font-bold text-slate-500">
            /uploads folder
          </span>
        )}
      </div>

      {loading && images.length === 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-xl border border-slate-100"
            >
              <div className="aspect-square bg-slate-100" />
              <div className="space-y-1.5 px-3 py-2">
                <div className="h-2.5 w-3/4 rounded bg-slate-100" />
                <div className="h-2 w-1/2 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      ) : images.length === 0 ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-alabaster px-6 py-16 text-center transition-colors hover:border-brand/40 hover:bg-rose-tint/50"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-300 shadow-sm">
            <ImageIcon className="h-6 w-6" />
          </span>
          <span className="mt-3 text-sm font-bold text-charcoal">
            Abhi koi image nahi hai
          </span>
          <span className="mt-1 text-xs text-slate-500">
            Upload karne ke liye click karein — modal me drag &amp; drop bhi chalega
          </span>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-white">
            <Upload className="h-3.5 w-3.5" />
            Upload Image
          </span>
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {images.map((img) => (
            <ImageCard
              key={img.filename}
              src={imageSrc(img.url)}
              filename={img.originalName || img.filename}
              meta={`${img.format || "IMG"} · ${Math.max(
                1,
                Math.round((img.bytes || img.size || 0) / 1024),
              )} KB`}
              onCopy={() => void copyUrl(img.url)}
              onDelete={() => setPendingDelete(img.filename)}
            />
          ))}
        </div>
      )}

      <ImageUploadModal
        open={open}
        onSelect={() => setOpen(false)}
        onClose={() => setOpen(false)}
        selectable={false}
      />

      <ConfirmDialog
        open={!!pendingDelete}
        onOpenChange={(value) => !value && !deleting && setPendingDelete(null)}
        title="Delete image?"
        description="Ye image permanently delete ho jaayegi. Undo nahi hoga."
        loading={deleting}
        onConfirm={() => void confirmDelete()}
      >
        {pendingImage && (
          <>
            <div className="overflow-hidden rounded-xl border border-slate-200">

              <img
                src={imageSrc(pendingImage.url)}
                alt={pendingImage.originalName || pendingImage.filename}
                className="max-h-48 w-full object-cover"
              />
            </div>
            <p className="mt-2 truncate text-xs text-slate-500">
              {pendingImage.originalName || pendingImage.filename}
            </p>
          </>
        )}
      </ConfirmDialog>
    </div>
  );
}
