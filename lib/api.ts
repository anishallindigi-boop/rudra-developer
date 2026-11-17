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
      badge: "HRERA Approved | DDJAY",
      location: "Sector 15, Narwana, Haryana",
      description:
        "Sector 15, Narwana mein HRERA-approved DDJAY residential plotted township, jahan modern infrastructure, wide roads aur peaceful community living milti hai.",
      overview:
        "Sector 15, Narwana (District Jind) mein lagbhag 11.99 acres mein faila Shree Rudra Homes ek modern residential plotted township hai. Deen Dayal Jan Awas Yojana (DDJAY) ke antargat develop ki ja rahi is township mein 206 independent residential plots uplabdh hain, jo aapke parivar ke sapno ke ghar aur safe long-term investment dono ke liye best hain.",
      bannerheading:
        "Shree Rudra Homes – Premium Residential Plots in Sector 15, Narwana",
      aboutheading: "Modern Township Living in the Heart of Narwana",
      aboutsubheading:
        "Deen Dayal Jan Awas Yojana (DDJAY) ke tahat 100% RERA-approved residential plots.",
      aboutpara1:
        "Shree Rudra Homes ko modern urban planning aur transparent legal standards ke saath design kiya gaya hai, taaki har parivar ko ek safe aur well-connected neighbourhood mil sake.",
      aboutpara2:
        "NH-52 highway, top schools, colleges aur hospitals ke nazdeek hone ki wajah se yeh project turant ghar banane aur future appreciation dono ke liye ideal hai.",
      abountpointone: "100% HRERA Approved (HRERA-PKL-JND-991-2026)",
      abountpointtwo: "11.99 Acres Planned Township with 206 Plots",
      abountpointthree: "Plot Sizes from 118 to 180 Sq. Yds.",
      abountpointfour:
        "Just 2.0 km from NH-52 Highway & 1.9 km from Govt. College",
      brochuretitle: "Download Shree Rudra Homes Brochure & Layout Plan",
      brochurepara:
        "Township ke master plan, plot dimensions, location map aur DDJAY specifications ki poori jankari ke liye official brochure download karein.",
      image: "/images/narwana-card.jpg",
      area: "11.99 Acres",
      totalUnits: "206 Residential Plots",
      plotSizes: "118 - 180 Sq. Yds.",
      reraNo: "HRERA-PKL-JND-991-2026",
      policy: "Deen Dayal Jan Awas Yojana (DDJAY)",
      amenities: [
        "Gated Entry & Secure Boundary Wall",
        "Wide Internal Paved Roads",
        "Modern Street Lighting",
        "Landscaped Green Parks & Open Spaces",
        "Underground Water Supply & Sewerage",
        "24x7 Security & Power Backup Infrastructure",
      ],
      locations: [
        { name: "Kamla Memorial Government College", distance: "1.9 km" },
        { name: "NH-52 Highway", distance: "2.0 km" },
        { name: "Narwana Bus Stand", distance: "2.5 km" },
        { name: "D.A.V. Centenary Public School", distance: "3.2 km" },
        { name: "Narwana Budget Mall", distance: "3.5 km" },
        { name: "Nandini Hospital", distance: "5.6 km" },
        { name: "Narwana Junction Railway Station", distance: "6.7 km" },
      ],
      chips: [
        "HRERA Approved",
        "DDJAY Township",
        "206 Plots",
        "Sector 15 Narwana",
        "Near NH-52",
      ],
      featured: true,
    },
    {
      slug: "bhagat-singh-colony-extension-kaithal",
      name: "Bhagat Singh Colony Extension, Kaithal",
      badge: "Prime Residential Plots",
      location: "Bhagat Singh Colony Extension, Kaithal, Haryana",
      description:
        "Kaithal ke prime location par secure boundary wall, grand lighting gate aur modern street lights ke saath ready-to-build residential plots.",
      overview:
        "Bhagat Singh Colony Extension un parivaron ke liye design kiya gaya hai jo Kaithal mein ek peaceful, secure aur easily accessible residential area ki talash mein hain. Majboot boundary wall, well-lit entrance gate, proper demarcation aur wide internal roads ke saath yeh colony turant ghar banane aur high-growth investment dono ke liye upyukt hai.",
      bannerheading:
        "Bhagat Singh Colony Extension – Secure & Well-Connected Living in Kaithal",
      aboutheading: "A Safe & Well-Planned Residential Address in Kaithal",
      aboutsubheading:
        "Boundary wall, grand lighting gate aur modern basic infrastructure ke saath residential plots.",
      aboutpara1:
        "Bhagat Singh Colony Extension aapko deta hai ek secure aur well-demarcated plotted environment, jahan aap bina kisi pareshani ke apne parivar ka ghar bana sakte hain.",
      aboutpara2:
        "Kaithal ke main markets, schools, hospitals aur HUDA Sector 19 ke nazdeek sthit hone ke karan yahan daily commute aur connectivity behad aasan hai.",
      abountpointone: "Complete Secure Boundary Wall",
      abountpointtwo: "Grand & Well-Lit Main Entrance Gate",
      abountpointthree: "Proper Street Lighting & Wide Internal Roads",
      abountpointfour: "Close to HUDA Sector 19 & Main Kaithal Markets",
      brochuretitle: "View Master Map & Colony Layout Plan",
      brochurepara:
        "Colony ke approved layout map, plot numbers, road width aur surrounding connectivity ki details dekhne ke liye brochure aur map check karein.",
      image: "/images/kaithal-card.jpg",
      area: "Planned Residential Colony",
      totalUnits: "Limited Residential Plots",
      plotSizes: "Multiple Plot Sizes Available",
      reraNo: "Approved Layout Plan",
      policy: "Residential Plotted Colony",
      amenities: [
        "Complete Boundary Wall Around Colony",
        "Grand Lighting Entrance Gate",
        "Proper Street Lighting",
        "Wide Internal Roads & Proper Demarcation",
        "Prime & Peaceful Residential Neighborhood",
        "Easy Access to Main Markets & HUDA Sector 19",
      ],
      chips: [
        "Gated Colony",
        "Boundary Wall",
        "Street Lights",
        "Prime Kaithal Location",
        "Ready to Build",
      ],
      featured: true,
    },
  ];

  const list = await safeFetch<Project[]>("/projects?featured=true", fallback);
  return list.length ? list : fallback;
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
