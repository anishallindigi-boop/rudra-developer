"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/lib/redux/store";
import { clearToken, getToken } from "@/lib/adminApi";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/images", label: "Images" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user] = useState<string>("admin");
  const [store] = useState<AppStore>(() => makeStore());

  useEffect(() => {
    if (!getToken()) router.replace("/admin/login");
  }, [router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  function logout() {
    clearToken();
    router.replace("/admin/login");
  }

  return (
    <Provider store={store}>
      <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
        <aside style={{ width: 240, background: "#fff", borderRight: "1px solid #f1f5f9", padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ padding: "8px 10px 18px", borderBottom: "1px solid #f1f5f9", marginBottom: 8 }}>
            <div style={{ fontWeight: 900, fontSize: 16, color: "#d11141" }}>Shree Rudra</div>
            <div style={{ fontSize: 10, letterSpacing: ".2em", color: "#c89d54", fontWeight: 700 }}>ADMIN PANEL</div>
          </div>
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, fontSize: 14, fontWeight: 600, color: active ? "#fff" : "#475569", background: active ? "#d11141" : "transparent" }}>
                {l.label}
              </Link>
            );
          })}
          <div style={{ marginTop: "auto", paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
            <button onClick={logout} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>Logout</button>
          </div>
        </aside>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <header style={{ background: "#fff", borderBottom: "1px solid #f1f5f9", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111111" }}>Dashboard</div>
            <span style={{ fontSize: 13, color: "#64748b" }}>{user}</span>
          </header>
          <main style={{ padding: 24, flex: 1 }}>{children}</main>
        </div>
      </div>
    </Provider>
  );
}
