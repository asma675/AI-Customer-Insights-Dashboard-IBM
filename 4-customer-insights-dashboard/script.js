const CUSTOMERS = [
  { name: "Northwind Retail", segment: "Retail", churnRisk: 0.78, health: "At Risk", nextBestAction: "Schedule QBR and propose usage-based pricing." },
  { name: "Maple Financial Group", segment: "Banking", churnRisk: 0.32, health: "Healthy", nextBestAction: "Introduce premium analytics add-on to expand account." },
  { name: "Prairie Health Network", segment: "Healthcare", churnRisk: 0.61, health: "Watchlist", nextBestAction: "Offer joint roadmap workshop with product and security teams." },
  { name: "Polar Logistics", segment: "Logistics", churnRisk: 0.44, health: "Stable", nextBestAction: "Run adoption campaign for underused features." }
];
function randomLatency() {
  return Math.floor(Math.random() * 200) + 110;
}
function renderCards(filterSegment) {
  const container = document.getElementById("outputBody");
  container.innerHTML = "";
  const data = filterSegment && filterSegment !== "all"
    ? CUSTOMERS.filter(c => c.segment === filterSegment)
    : CUSTOMERS;
  if (!data.length) {
    container.innerHTML = "<p>No customers match this filter.</p>";
    return;
  }
  data.forEach(c => {
    const riskPct = Math.round(c.churnRisk * 100);
    const riskColor = riskPct > 70 ? "var(--danger)" : riskPct > 50 ? "var(--warning)" : "var(--success)";
    const card = document.createElement("div");
    card.className = "metric";
    card.innerHTML = `
      <div class="metric-label">${c.segment}</div>
      <div class="metric-value">${c.name}</div>
      <p style="margin:4px 0 0; font-size:0.75rem; color:var(--muted);">
        Churn risk: <span style="color:${riskColor}; font-weight:600;">${riskPct}%</span> • Health: <strong>${c.health}</strong>
      </p>
      <p style="margin:6px 0 0; font-size:0.78rem;">Next best action: ${c.nextBestAction}</p>
    `;
    container.appendChild(card);
  });
}
window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("mainInput");
  const sampleBtn = document.getElementById("sampleBtn");
  const clearBtn = document.getElementById("clearBtn");
  const runBtn = document.getElementById("runBtn");
  const extraControls = document.getElementById("extraControls");
  const outputPanel = document.getElementById("outputPanel");
  const metricConfidence = document.getElementById("metricConfidence");
  const metricLatency = document.getElementById("metricLatency");
  const metricPattern = document.getElementById("metricPattern");
  extraControls.innerHTML = `
    <div class="field">
      <label for="segmentSelect">Filter by segment</label>
      <select id="segmentSelect">
        <option value="all">All</option>
        <option value="Retail">Retail</option>
        <option value="Banking">Banking</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Logistics">Logistics</option>
      </select>
    </div>
  `;
  const segmentSelect = document.getElementById("segmentSelect");
  renderCards("all");
  sampleBtn.addEventListener("click", () => {
    input.value = "Highlight accounts with elevated churn risk and propose a next-best action for each segment.";
  });
  clearBtn.addEventListener("click", () => {
    input.value = "";
    renderCards("all");
    outputPanel.querySelector(".output-header").innerHTML = '<span>Awaiting input...</span><span class="chip">No run yet</span>';
    metricConfidence.textContent = "-";
    metricLatency.textContent = "-";
    metricPattern.textContent = "-";
  });
  runBtn.addEventListener("click", () => {
    const latency = randomLatency();
    const confidence = (Math.random() * 0.15 + 0.8).toFixed(2);
    renderCards(segmentSelect.value);
    outputPanel.querySelector(".output-header").innerHTML =
      '<span>Customer insights refreshed (simulated)</span><span class="chip">Churn & NBA pattern</span>';
    metricConfidence.textContent = confidence;
    metricLatency.textContent = latency.toString();
    metricPattern.textContent = "Sales • Churn & Next Best Action";
  });
  segmentSelect.addEventListener("change", () => {
    renderCards(segmentSelect.value);
  });
});