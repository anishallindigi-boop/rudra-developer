const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function safeFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export type Project = {
  _id?: string;
  slug: string;
  name?: string;
  badge?: string;
  location?: string;
  description?: string;
  overview?: string;
  image?: string;
  homebanner?: string;
  bannerlogo?: string;
  bannerheading?: string;
  projectcategory?: string;
  brochurepdf?: string;
  aboutheading?: string;
  aboutsubheading?: string;
  aboutslideimages?: string[];
  aboutpara1?: string;
  aboutpara2?: string;
  abountpointone?: string;
  abountpointtwo?: string;
  abountpointthree?: string;
  abountpointfour?: string;
  glimpse?: { gimage?: string; gtitle?: string; gpara1?: string; gpara2?: string }[];
  immersivetour?: { immersiveTitle?: string; immersiveThumbnail?: string; immersiveVideoUrl?: string }[];
  premiereoffering?: { tabid?: string; tabtitle?: string; tabslides?: { slidetitle?: string; slideimage?: string }[] }[];
  brochureimage?: string;
  brochuretitle?: string;
  brochurepara?: string;
  connectivity?: string;
  status?: string;
  area?: string;
  totalUnits?: string;
  plotSizes?: string;
  reraNo?: string;
  policy?: string;
  amenities?: string[];
  locations?: { name: string; distance: string }[];
  chips?: string[];
  featured?: boolean;
};

export type Blog = {
  _id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  author?: string;
  tags?: string[];
  published?: boolean;
  publishedAt?: string;
};

export async function getProjects(): Promise<Project[]> {
  const fallback: Project[] = [
    {
      slug: "shree-rudra-homes-narwana",
      name: "Shree Rudra Homes, Narwana",
      badge: "HRERA Approved • DDJAY",
      location: "Sector 15, Narwana (District Jind)",
      description: "Deen Dayal Jan Awas Yojana ke tahat sector-based RERA-approved plotted residential township — 206 premium plots.",
      image: "/images/narwana-card.jpg",
      area: "~11.99 Acres",
      totalUnits: "206 Residential Plots",
      plotSizes: "118–180 Sq. Yds.",
      reraNo: "HRERA-PKL-JND-991-2026",
      policy: "Deen Dayal Jan Awas Yojana (DDJAY)",
      chips: ["206 Plots", "118–180 Sq. Yds.", "~11.99 Acres"],
      featured: true,
    },
    {
      slug: "bhagat-singh-colony-extension-kaithal",
      name: "Bhagat Singh Colony Extension, Kaithal",
      badge: "Prime Kaithal Location",
      location: "Near HUDA Sector 19, Kaithal",
      description: "Modern infrastructure aur premium amenities ke saath residential plotted colony.",
      image: "/images/kaithal-card.jpg",
      chips: ["Boundary Wall", "Lighting Gate", "Master Map"],
      featured: true,
    },
  ];
  return safeFetch<Project[]>("/projects?featured=true", fallback);
}

export async function getProject(slug: string): Promise<Project | null> {
  const fallback = (await getProjects()).find((p) => p.slug === slug) || null;
  return safeFetch<Project | null>(`/projects/${slug}`, fallback);
}

export async function getBlogs(): Promise<Blog[]> {
  return safeFetch<Blog[]>("/blogs?published=true", []);
}

export async function getBlog(slug: string): Promise<Blog | null> {
  return safeFetch<Blog | null>(`/blogs/${slug}`, null);
}

export async function submitEnquiry(payload: { name: string; phone: string; project?: string; message?: string }) {
  const res = await fetch(`${API_BASE}/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to submit enquiry");
  return res.json();
}
