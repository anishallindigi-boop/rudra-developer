export type StatCard = { label: string; value: number; color: string };

/** Dashboard stat cards row. */
export default function StatCards({ cards }: { cards: StatCard[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 24 }}>
      {cards.map((card) => (
        <div
          key={card.label}
          style={{ background: "#fff", borderRadius: 14, padding: 20, borderLeft: `4px solid ${card.color}`, boxShadow: "0 4px 14px rgba(0,0,0,.05)" }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#64748b", marginBottom: 6 }}>
            {card.label}
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: "#111111" }}>{card.value}</div>
        </div>
      ))}
    </div>
  );
}
