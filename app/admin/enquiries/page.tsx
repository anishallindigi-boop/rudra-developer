"use client";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import {
  ActionButtons,
  AdminPageHeader,
  AdminTable,
  type AdminColumn,
} from "@/components/admin/AdminUI";

const statusColor = (status: string) =>
  status === "new" ? "#fef3c7" : status === "contacted" ? "#dbeafe" : "#dcfce7";

const statusTextColor = (status: string) =>
  status === "new" ? "#92400e" : status === "contacted" ? "#1e40af" : "#166534";

export default function AdminEnquiries() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { setItems(await adminApi.getEnquiries()); }
    catch (e: any) { alert(e.message); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: string) {
    try { await adminApi.updateEnquiry(id, status); load(); }
    catch (e: any) { alert(e.message); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete?")) return;
    try { await adminApi.deleteEnquiry(id); load(); }
    catch (e: any) { alert(e.message); }
  }

  const columns: AdminColumn<any>[] = [
    { header: "Name", cell: (e) => <span style={{ fontWeight: 700 }}>{e.name}</span> },
    { header: "Phone", cell: (e) => e.phone },
    { header: "Project", cell: (e) => e.project },
    { header: "Message", cell: (e) => <span style={{ fontSize: 12 }}>{e.message}</span>, style: { maxWidth: 200 } },
    {
      header: "Status",
      cell: (e) => (
        <select
          value={e.status}
          onChange={(ev) => updateStatus(e._id, ev.target.value)}
          style={{ padding: "4px 8px", fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0", background: statusColor(e.status), color: statusTextColor(e.status), fontWeight: 700 }}
        >
          <option value="new">new</option>
          <option value="contacted">contacted</option>
          <option value="closed">closed</option>
        </select>
      ),
    },
    { header: "Date", cell: (e) => <span style={{ fontSize: 12 }}>{new Date(e.createdAt).toLocaleDateString()}</span> },
    { header: "Actions", cell: (e) => <ActionButtons onDelete={() => handleDelete(e._id)} /> },
  ];

  return (
    <div>
      <AdminPageHeader title="Enquiries" />
      <AdminTable
        columns={columns}
        rows={items}
        loading={loading}
        emptyText="No enquiries yet"
      />
    </div>
  );
}
