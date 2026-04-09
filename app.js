/* =========================================================
   Jan Aushadhi Mitra — app.js
   Handles: medicine search, store locator redirect, UI logic
   ========================================================= */

let medicines = [];

// ── Load medicines data ───────────────────────────────────
async function loadMedicines() {
  try {
    const res = await fetch("medicines.json");
    medicines = await res.json();
  } catch (err) {
    console.error("Could not load medicines.json:", err);
  }
}

// ── Search logic ──────────────────────────────────────────
function searchMedicines(query) {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  return medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.generic_name.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q) ||
      m.uses.toLowerCase().includes(q)
  );
}

// ── Calculate savings % ───────────────────────────────────
function savingsPct(branded, generic) {
  return Math.round(((branded - generic) / branded) * 100);
}

// ── Render search results ─────────────────────────────────
function renderResults(results) {
  const container = document.getElementById("search-results");
  container.classList.remove("hidden");

  if (results.length === 0) {
    container.innerHTML = `<p class="no-results">No medicines found. Try a different name or active ingredient.</p>`;
    return;
  }

  container.innerHTML = results
    .map(
      (m) => `
    <div class="result-item">
      <div>
        <div class="result-name">${m.name}</div>
        <div class="result-meta">${m.category} &bull; ${m.uses}</div>
        <span class="result-savings">Save ${savingsPct(m.branded_price, m.jan_aushadhi_price)}% vs ${m.branded_example}</span>
      </div>
      <div class="result-price">
        <span class="price-generic">₹${m.jan_aushadhi_price.toFixed(2)}</span>
        <span class="price-branded">₹${m.branded_price.toFixed(2)}</span>
        <div style="font-size:11px;color:#aaa;margin-top:2px;">${m.unit}</div>
      </div>
    </div>
  `
    )
    .join("");
}

// ── Store locator ─────────────────────────────────────────
function findStore() {
  const location = document.getElementById("location-input").value.trim();

  if (!location) {
    // Try GPS location
    if (!navigator.geolocation) {
      alert("Please enter your city name or pincode.");
      return;
    }

    const btn = document.getElementById("store-btn");
    btn.textContent = "Detecting location...";
    btn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // Open Google Maps with Jan Aushadhi search near coordinates
        const url = `https://www.google.com/maps/search/Jan+Aushadhi+store/@${latitude},${longitude},14z`;
        window.open(url, "_blank");
        btn.textContent = "📍 Find Jan Aushadhi Store Near Me";
        btn.disabled = false;
      },
      (err) => {
        alert("Location access denied. Please enter your city or pincode.");
        btn.textContent = "📍 Find Jan Aushadhi Store Near Me";
        btn.disabled = false;
      },
      { timeout: 8000 }
    );
    return;
  }

  // If text entered — use official locator
  const url = `https://www.google.com/maps/search/Jan+Aushadhi+store+${encodeURIComponent(location)}`;
  window.open(url, "_blank");
}
// ── Event listeners ───────────────────────────────────────
function initEventListeners() {
  const searchBtn = document.getElementById("search-btn");
  const medicineInput = document.getElementById("medicine-input");
  const storeBtn = document.getElementById("store-btn");

  // Search on button click
  searchBtn.addEventListener("click", () => {
    const query = medicineInput.value;
    const results = searchMedicines(query);
    renderResults(results);
  });

  // Search on Enter key
  medicineInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const results = searchMedicines(medicineInput.value);
      renderResults(results);
    }
  });

  // Live search as user types (debounced)
  let debounceTimer;
  medicineInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = medicineInput.value;
      if (query.length >= 2) {
        const results = searchMedicines(query);
        renderResults(results);
      } else {
        const container = document.getElementById("search-results");
        container.classList.add("hidden");
        container.innerHTML = "";
      }
    }, 300);
  });

  // Store locator button
  storeBtn.addEventListener("click", findStore);

  // Location input — Enter key
  document.getElementById("location-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") findStore();
  });
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  await loadMedicines();
  initEventListeners();
});
