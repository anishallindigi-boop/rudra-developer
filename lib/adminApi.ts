const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("rudra_token");
}

export function setToken(token: string) {
  localStorage.setItem("rudra_token", token);
}

export function clearToken() {
  localStorage.removeItem("rudra_token");
}

export async function adminFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (res.status === 401) {
    clearToken();
    if (typeof window !== "undefined") window.location.assign(window.location.origin + "/admin/login");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}

export const adminApi = {
  login: (username: string, password: string) =>
    adminFetch("/auth/login", { method: "POST", body: JSON.stringify({ username, password }) }),

  // projects
  getProjects: () => adminFetch("/projects"),
  createProject: (payload: unknown) => adminFetch("/projects", { method: "POST", body: JSON.stringify(payload) }),
  updateProject: (slug: string, payload: unknown) => adminFetch(`/projects/${slug}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteProject: (slug: string) => adminFetch(`/projects/${slug}`, { method: "DELETE" }),

  // blogs
  getBlogs: () => adminFetch("/blogs"),
  createBlog: (payload: unknown) => adminFetch("/blogs", { method: "POST", body: JSON.stringify(payload) }),
  updateBlog: (slug: string, payload: unknown) => adminFetch(`/blogs/${slug}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteBlog: (slug: string) => adminFetch(`/blogs/${slug}`, { method: "DELETE" }),

  // enquiries
  getEnquiries: () => adminFetch("/enquiries"),
  updateEnquiry: (id: string, status: string) => adminFetch(`/enquiries/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),
  deleteEnquiry: (id: string) => adminFetch(`/enquiries/${id}`, { method: "DELETE" }),

  // images
  getImages: () => adminFetch("/images"),
  uploadImage: async (file: File, alt: string, folder: string) => {
    const fd = new FormData();
    fd.append("image", file);
    fd.append("alt", alt);
    fd.append("folder", folder);
    const token = getToken();
    const res = await fetch(`${API_BASE}/images/upload`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: fd,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  },
  deleteImage: (id: string) => adminFetch(`/images/${id}`, { method: "DELETE" }),
};
