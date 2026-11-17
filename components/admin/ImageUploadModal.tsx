"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { DragEvent } from "react";
import { toast } from "sonner";
import {
  AlertCircle,
  Check,
  Copy,
  Eye,
  ImageIcon,
  ImagePlus,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  deleteImage,
  getImages,
  uploadImages,
  type ImageItem,
} from "@/lib/redux/slice/ImageSlice";
import { RootState } from "@/lib/redux/store";
import { imageSrc } from "@/lib/imageUrl";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "./ConfirmDialog";

const MAX_MB = 10;
const MAX_BYTES = MAX_MB * 1024 * 1024;

type QueueStatus = "pending" | "uploading" | "error";
type QueueItem = { id: string; file: File; status: QueueStatus };

interface Props {
  open: boolean;
  onSelect: (urls: string[]) => void;
  onClose: () => void;
  multiple?: boolean;
  /** false = pure library mode: clicking an image opens the preview instead of selecting it. */
  selectable?: boolean;
}

function formatSize(bytes = 0) {
  if (!bytes) return "0 KB";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function errMessage(err: unknown, fallback: string) {
  if (typeof err === "string" && err.trim()) return err;
  if (err && typeof err === "object" && "message" in err) {
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) return message;
  }
  return fallback;
}

export default function ImageUploadModal({
  open,
  onSelect,
  onClose,
  multiple = true,
  selectable = true,
}: Props) {
  const dispatch = useAppDispatch();
  const { images } = useAppSelector((state: RootState) => state.image);

  const [fetching, setFetching] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [query, setQuery] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<ImageItem | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ImageItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const uploading = queue.some((item) => item.status === "uploading");

  const fetchImages = useCallback(async () => {
    setFetching(true);
    try {
      await dispatch(getImages()).unwrap();
    } catch (err) {
      toast.error(errMessage(err, "Images load nahi ho paayi"));
    } finally {
      setFetching(false);
    }
  }, [dispatch]);

  /* Reset + refresh every time the modal opens */
  useEffect(() => {
    if (!open) return;
    setSelected([]);
    setQueue([]);
    setQuery("");
    setPreview(null);
    setPendingDelete(null);
    setDragActive(false);
    void fetchImages();
  }, [open, fetchImages]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return images;
    return images.filter((img) =>
      [img.originalName, img.filename, img.folder]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q)),
    );
  }, [images, query]);

  const allSelected =
    filtered.length > 0 && filtered.every((img) => selected.includes(img.url));

  const runUpload = useCallback(
    async (items: QueueItem[]) => {
      if (items.length === 0) return;
      const ids = new Set(items.map((item) => item.id));

      setQueue((prev) =>
        prev.map((item) => (ids.has(item.id) ? { ...item, status: "uploading" } : item)),
      );

      const fd = new FormData();
      items.forEach((item) => fd.append("images", item.file));

      try {
        await dispatch(uploadImages(fd)).unwrap();
        setQueue((prev) => prev.filter((item) => !ids.has(item.id)));
        toast.success(`${items.length} image${items.length > 1 ? "s" : ""} uploaded`);
      } catch (err) {
        setQueue((prev) =>
          prev.map((item) => (ids.has(item.id) ? { ...item, status: "error" } : item)),
        );
        toast.error(errMessage(err, "Upload failed — dobara try karein"));
      }
    },
    [dispatch],
  );

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      const accepted: QueueItem[] = [];
      let rejectedType = 0;
      let rejectedSize = 0;

      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          rejectedType += 1;
          continue;
        }
        if (file.size > MAX_BYTES) {
          rejectedSize += 1;
          continue;
        }
        accepted.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          file,
          status: "pending",
        });
      }

      if (rejectedType > 0) {
        toast.error(`${rejectedType} file(s) skip — sirf image files allowed hain`);
      }
      if (rejectedSize > 0) {
        toast.error(`${rejectedSize} file(s) skip — max ${MAX_MB}MB per image`);
      }
      if (accepted.length === 0) return;

      setQueue((prev) => [...prev, ...accepted]);
      void runUpload(accepted);
    },
    [runUpload],
  );

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files?.length) addFiles(event.dataTransfer.files);
  }

  function toggleSelect(url: string) {
    setSelected((prev) => {
      if (prev.includes(url)) return prev.filter((item) => item !== url);
      return multiple ? [...prev, url] : [url];
    });
  }

  function handleImageClick(img: ImageItem) {
    if (!selectable) {
      setPreview(img);
      return;
    }
    if (multiple) {
      toggleSelect(img.url);
      return;
    }
    onSelect([img.url]);
    onClose();
  }

  function confirmSelection() {
    if (selected.length === 0) {
      toast.error("Pehle kam se kam ek image select karein");
      return;
    }
    onSelect(selected);
    setSelected([]);
    onClose();
  }

  function pickFromPreview(img: ImageItem) {
    if (multiple) {
      toggleSelect(img.url);
      setPreview(null);
      return;
    }
    onSelect([img.url]);
    setPreview(null);
    onClose();
  }

  async function copyUrl(img: ImageItem) {
    try {
      await navigator.clipboard.writeText(imageSrc(img.url));
      toast.success("Image URL copied");
    } catch {
      toast.error("Copy nahi ho paaya");
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await dispatch(deleteImage(pendingDelete.filename)).unwrap();
      setSelected((prev) => prev.filter((url) => url !== pendingDelete.url));
      setPendingDelete(null);
      toast.success("Image deleted");
    } catch (err) {
      toast.error(errMessage(err, "Delete failed"));
    } finally {
      setDeleting(false);
    }
  }

  function handleClose() {
    setSelected([]);
    setQueue([]);
    setQuery("");
    setPreview(null);
    setPendingDelete(null);
    onClose();
  }

  const hasImages = images.length > 0;

  return (
    <>
      <Dialog open={open} onOpenChange={(value) => !value && handleClose()}>
        <DialogContent className="flex max-h-[92vh] w-[calc(100vw-2rem)] max-w-5xl flex-col gap-0 overflow-hidden rounded-2xl border-slate-200 p-0">
          {/* Header */}
          <DialogHeader className="flex flex-row items-center gap-3 border-b border-slate-100 px-5 py-4 pr-14 text-left sm:px-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-tint text-brand">
              <ImageIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <DialogTitle className="text-base font-extrabold tracking-tight text-charcoal">
                Image Library
              </DialogTitle>
              <DialogDescription className="mt-0.5 text-xs text-slate-500">
                {selectable
                  ? "Image select karein ya nayi upload karein"
                  : "Upload karein, URL copy karein ya delete karein"}
              </DialogDescription>
            </div>
            <span className="ml-auto hidden shrink-0 rounded-full bg-alabaster px-3 py-1 text-[11px] font-bold text-slate-500 sm:inline">
              {images.length} image{images.length === 1 ? "" : "s"}
            </span>
          </DialogHeader>

          {/* Body */}
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 sm:px-6">
            {/* Drop zone */}
            <label
              onDragEnter={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                setDragActive(false);
              }}
              onDrop={onDrop}
              className={cn(
                "relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed text-center transition-all",
                hasImages
                  ? "px-4 py-5 sm:flex-row sm:justify-start sm:gap-4 sm:text-left"
                  : "px-6 py-12",
                dragActive
                  ? "border-brand bg-rose-tint"
                  : "border-slate-200 bg-alabaster hover:border-brand/40 hover:bg-rose-tint/50",
              )}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(event) => {
                  if (event.target.files?.length) addFiles(event.target.files);
                  event.target.value = "";
                }}
                className="sr-only"
              />
              <span
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-full transition-colors",
                  hasImages ? "h-10 w-10" : "h-14 w-14",
                  dragActive ? "bg-brand text-white" : "bg-white text-brand shadow-sm",
                )}
              >
                {uploading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Upload className={hasImages ? "h-5 w-5" : "h-6 w-6"} />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-charcoal">
                  {dragActive
                    ? "Drop to upload"
                    : hasImages
                      ? "Upload more images"
                      : "Drag & drop images here"}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {hasImages
                    ? "Drop karein ya click karke browse karein"
                    : "Ya click karke apne computer se choose karein"}
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  JPG, PNG, WebP, GIF · max {MAX_MB}MB each
                  {selectable && multiple ? " · multiple allowed" : ""}
                </p>
              </div>
              <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-white shadow-sm sm:ml-auto">
                <ImagePlus className="h-3.5 w-3.5" />
                Choose files
              </span>
            </label>

            {/* Upload queue */}
            {queue.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    Upload queue · {queue.length}
                  </p>
                  {uploading ? (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-brand">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Uploading…
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setQueue([])}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <ul className="max-h-32 space-y-1.5 overflow-y-auto pr-1">
                  {queue.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-2 rounded-lg bg-alabaster px-2.5 py-2 text-xs"
                    >
                      <span className="shrink-0">
                        {item.status === "uploading" ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-brand" />
                        ) : item.status === "error" ? (
                          <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                        ) : (
                          <ImageIcon className="h-3.5 w-3.5 text-slate-400" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1 truncate font-semibold text-charcoal">
                        {item.file.name}
                      </span>
                      <span className="shrink-0 text-slate-400">
                        {formatSize(item.file.size)}
                      </span>
                      {item.status === "error" ? (
                        <>
                          <button
                            type="button"
                            onClick={() => void runUpload([item])}
                            className="shrink-0 font-bold text-brand hover:underline"
                          >
                            Retry
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setQueue((prev) => prev.filter((q) => q.id !== item.id))
                            }
                            className="shrink-0 rounded p-0.5 text-slate-400 hover:text-slate-600"
                            aria-label="Remove from queue"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </>
                      ) : item.status === "pending" ? (
                        <button
                          type="button"
                          onClick={() =>
                            setQueue((prev) => prev.filter((q) => q.id !== item.id))
                          }
                          className="shrink-0 rounded p-0.5 text-slate-400 hover:text-slate-600"
                          aria-label="Remove from queue"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[180px] flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name or folder…"
                  className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-9 text-sm text-charcoal outline-none transition-colors placeholder:text-slate-400 focus:border-brand/40 focus:ring-2 focus:ring-brand/10"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-600"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {selectable && multiple && filtered.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setSelected(allSelected ? [] : filtered.map((img) => img.url))
                  }
                  className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 transition-colors hover:border-brand/40 hover:text-brand"
                >
                  {allSelected ? "Clear selection" : "Select all"}
                </button>
              )}

              <button
                type="button"
                onClick={() => void fetchImages()}
                disabled={fetching}
                className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 transition-colors hover:border-brand/40 hover:text-brand disabled:opacity-50"
              >
                <RefreshCw className={cn("h-3.5 w-3.5", fetching && "animate-spin")} />
                Refresh
              </button>
            </div>

            {/* Gallery */}
            {fetching && images.length === 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse overflow-hidden rounded-xl border border-slate-100"
                  >
                    <div className="aspect-square bg-slate-100" />
                    <div className="space-y-1.5 px-2.5 py-2">
                      <div className="h-2.5 w-3/4 rounded bg-slate-100" />
                      <div className="h-2 w-1/2 rounded bg-slate-100" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-alabaster px-6 py-12 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-300 shadow-sm">
                  <ImageIcon className="h-6 w-6" />
                </span>
                <p className="mt-3 text-sm font-bold text-charcoal">
                  {images.length === 0 ? "No images yet" : "Koi image match nahi hui"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {images.length === 0
                    ? "Upar drag & drop karein ya choose files par click karein"
                    : "Search term badal kar dekhein"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {filtered.map((img) => {
                  const isSelected = selected.includes(img.url);
                  const name = img.originalName || img.filename;

                  return (
                    <div
                      key={img.filename}
                      className={cn(
                        "group relative overflow-hidden rounded-xl border bg-white transition-all",
                        isSelected
                          ? "border-brand ring-2 ring-brand/25"
                          : "border-slate-200 hover:border-slate-300 hover:shadow-md",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => handleImageClick(img)}
                        className="block w-full text-left"
                        aria-label={selectable ? `Select ${name}` : `Preview ${name}`}
                      >
                        <span className="relative block aspect-square overflow-hidden bg-slate-100">
                          
                          <img
                            src={imageSrc(img.url)}
                            alt={name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {isSelected && (
                            <>
                              <span className="absolute inset-0 bg-brand/25" />
                              <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white shadow-sm">
                                <Check className="h-3.5 w-3.5" />
                              </span>
                            </>
                          )}
                        </span>
                        <span className="block px-2.5 py-2">
                          <span
                            className="block truncate text-[11px] font-semibold text-charcoal"
                            title={name}
                          >
                            {name}
                          </span>
                          <span className="block text-[10px] text-slate-400">
                            {img.format || "IMG"} · {formatSize(img.bytes ?? img.size)}
                          </span>
                        </span>
                      </button>

                      {/* Hover actions (siblings so there are no nested buttons) */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-end gap-1 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setPreview(img);
                          }}
                          title="Preview"
                          aria-label={`Preview ${name}`}
                          className="pointer-events-auto rounded-md bg-white/95 p-1.5 text-slate-700 shadow-sm transition-colors hover:bg-white"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setPendingDelete(img);
                          }}
                          title="Delete"
                          aria-label={`Delete ${name}`}
                          className="pointer-events-auto rounded-md bg-white/95 p-1.5 text-red-600 shadow-sm transition-colors hover:bg-white"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <DialogFooter className="flex-row items-center justify-between gap-3 border-t border-slate-100 px-5 py-3.5 sm:justify-between sm:px-6">
            <p className="text-xs text-slate-500">
              {selectable
                ? multiple
                  ? `${selected.length} selected${selected.length > 0 ? " · confirm karein" : ""}`
                  : "Image par click karke use karein"
                : `${images.length} image${images.length === 1 ? "" : "s"} in library`}
            </p>
            <div className="flex items-center gap-2">
              {selectable && multiple && selected.length > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setSelected([])}
                >
                  Clear
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={handleClose}
              >
                {selectable ? "Cancel" : "Close"}
              </Button>
              {selectable && multiple && (
                <Button
                  type="button"
                  className="cursor-pointer bg-brand text-white hover:bg-brand-dark"
                  onClick={confirmSelection}
                  disabled={selected.length === 0 || fetching}
                >
                  Use Selected ({selected.length})
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview */}
      <Dialog open={!!preview} onOpenChange={(value) => !value && setPreview(null)}>
        <DialogContent className="max-w-3xl gap-0 overflow-hidden rounded-2xl border-slate-200 p-0">
          <DialogTitle className="sr-only">Image preview</DialogTitle>
          <DialogDescription className="sr-only">
            Full size preview of the selected image
          </DialogDescription>
          <div className="flex max-h-[65vh] items-center justify-center bg-charcoal p-4">
            {preview && (
              
              <img
                src={imageSrc(preview.url)}
                alt={preview.originalName || preview.filename}
                className="max-h-[60vh] w-auto max-w-full object-contain"
              />
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-charcoal">
                {preview?.originalName || preview?.filename}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {preview?.format || "IMG"} · {formatSize(preview?.bytes ?? preview?.size)}
                {preview?.width && preview?.height
                  ? ` · ${preview.width}×${preview.height}`
                  : ""}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => preview && void copyUrl(preview)}
              >
                <Copy className="h-4 w-4" />
                Copy URL
              </Button>
              {selectable && (
                <Button
                  type="button"
                  className="cursor-pointer bg-brand text-white hover:bg-brand-dark"
                  onClick={() => preview && pickFromPreview(preview)}
                >
                  {multiple
                    ? preview && selected.includes(preview.url)
                      ? "Unselect"
                      : "Select"
                    : "Use this image"}
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => setPreview(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation (shared component) */}
      <ConfirmDialog
        open={!!pendingDelete}
        onOpenChange={(value) => !value && !deleting && setPendingDelete(null)}
        title="Delete image?"
        description="Ye image permanently delete ho jaayegi. Undo nahi hoga."
        loading={deleting}
        onConfirm={() => void confirmDelete()}
      >
        {pendingDelete && (
          <>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              
              <img
                src={imageSrc(pendingDelete.url)}
                alt={pendingDelete.originalName || pendingDelete.filename}
                className="max-h-48 w-full object-cover"
              />
            </div>
            <p className="mt-2 truncate text-xs text-slate-500">
              {pendingDelete.originalName || pendingDelete.filename}
            </p>
          </>
        )}
      </ConfirmDialog>
    </>
  );
}
