"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi, setToken } from "@/lib/adminApi";
import { FormField, inputStyle } from "./AdminUI";

export default function LoginForm() {
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
    <form onSubmit={onSubmit} style={{ width: 380, padding: 32, background: "#fff", borderRadius: 14, boxShadow: "0 20px 50px rgba(0,0,0,.2)" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontWeight: 900, fontSize: 22, color: "#d11141" }}>Shree Rudra</div>
        <div style={{ fontSize: 11, letterSpacing: ".2em", color: "#c89d54", fontWeight: 700 }}>ADMIN LOGIN</div>
      </div>

      <FormField label="Username">
        <input value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
      </FormField>

      <div style={{ marginTop: 14 }}>
        <FormField label="Password">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
        </FormField>
      </div>

      {error && <div style={{ color: "#b91c1c", fontSize: 13, marginTop: 12 }}>{error}</div>}

      <button
        type="submit"
        disabled={loading}
        style={{ width: "100%", marginTop: 16, padding: "12px", borderRadius: 999, background: "#d11141", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <div style={{ marginTop: 16, fontSize: 12, color: "#64748b", textAlign: "center" }}>
        Default: admin / admin123
      </div>
    </form>
  );
}
