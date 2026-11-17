import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToken } from "@/lib/adminApi";

export interface ImageItem {
  _id?: string;
  filename: string;
  originalName?: string;
  url: string;
  mimetype?: string;
  size?: number;
  alt?: string;
  folder?: string;
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
}

interface ImageState {
  images: ImageItem[];
  loading: boolean;
  message: string | null;
  error: string | null;
}

const initialState: ImageState = {
  images: [],
  loading: false,
  message: null,
  error: null,
};

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getImages = createAsyncThunk("image/getImages", async (): Promise<ImageItem[]> => {
  const token = getToken();
  const res = await fetch(`${API}/images`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to load images");
  return data;
});

export const uploadImages = createAsyncThunk("image/uploadImages", async (fd: FormData): Promise<ImageItem[]> => {
  const token = getToken();
  const res = await fetch(`${API}/images/upload`, {
    method: "POST",
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: fd,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Upload failed");
  return Array.isArray(data) ? data : data.images || [];
});

export const deleteImage = createAsyncThunk<{ message: string }, string, { rejectValue: string }>("image/deleteImage", async (filename: string) => {
  const token = getToken();
  const res = await fetch(`${API}/images/${filename}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Delete failed");
  return data;
});

export const ImageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    resetImageState: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImages.pending, (s) => {
        s.loading = true;
      })
      .addCase(getImages.fulfilled, (s, a) => {
        s.loading = false;
        s.images = a.payload;
        s.error = null;
      })
      .addCase(getImages.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error?.message || "Failed to load images";
      })
      .addCase(uploadImages.pending, (s) => {
        s.loading = true;
      })
      .addCase(uploadImages.fulfilled, (s, a) => {
        s.loading = false;
        const added = a.payload.filter((p) => !s.images.some((i) => i.filename === p.filename));
        s.images = [...added, ...s.images];
        s.message = "Image uploaded successfully";
        s.error = null;
      })
      .addCase(uploadImages.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error?.message || "Upload failed";
      })
      .addCase(deleteImage.fulfilled, (s, a) => {
        const filename = a.meta.arg;
        s.images = s.images.filter((i) => i.filename !== filename);
      });
  },
});

export const { resetImageState } = ImageSlice.actions;
export default ImageSlice.reducer;
export const selectImages = (state: { image: ImageState }) => state.image;
