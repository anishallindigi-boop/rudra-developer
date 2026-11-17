"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi, setToken } from "@/lib/adminApi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await adminApi.login(username, password);
      setToken(data.token);
      router.replace("/admin");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #d11141, #a80d34)" }}>
      <form onSubmit={onSubmit} style={{ width: 380, padding: 32, background: "#fff", borderRadius: 14, boxShadow: "0 20px 50px rgba(0,0,0,.2)" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontWeight: 900, fontSize: 22, color: "#d11141" }}>Shree Rudra</div>
          <div style={{ fontSize: 11, letterSpacing: ".2em", color: "#c89d54", fontWeight: 700 }}>ADMIN LOGIN</div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#64748b", marginBottom: 6, display: "block" }}>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 14 }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#64748b", marginBottom: 6, display: "block" }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 14 }} />
        </div>
        {error && <div style={{ color: "#b91c1c", fontSize: 13, marginBottom: 12 }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px", borderRadius: 999, background: "#d11141", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <div style={{ marginTop: 16, fontSize: 12, color: "#64748b", textAlign: "center" }}>Default: admin / admin123</div>
      </form>
    </div>
  );
}
