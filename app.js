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
  const locationInput = document.getElementById("location-input");
  if (!locationInput) {
    console.error("location-input element not found");
    return;
  }

  const location = locationInput.value.trim();
  const btn = document.getElementById("store-btn");
  const isPincode = /^\d{6}$/.test(location);

  // Show store options UI if it exists (optional results box)
  showStoreOptions(location, isPincode);

  if (!location) {
    // No text entered — try GPS
    if (!navigator.geolocation) {
      alert("Please enter your city name or pincode.");
      return;
    }

    btn.textContent = "Detecting location...";
    btn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://www.google.com/maps/search/Jan+Aushadhi+store/@${latitude},${longitude},14z`;
        window.open(url, "_blank");
        btn.textContent = "📍 Find Jan Aushadhi Store Near Me";
        btn.disabled = false;
      },
      () => {
        alert("Location access denied. Please enter your city or pincode.");
        btn.textContent = "📍 Find Jan Aushadhi Store Near Me";
        btn.disabled = false;
      },
      { timeout: 8000 }
    );
    return;
  }

  // Text entered — open Google Maps (most reliable, works on all devices)
  const mapsUrl = `https://www.google.com/maps/search/Jan+Aushadhi+store+${encodeURIComponent(location)}`;
  window.open(mapsUrl, "_blank");
}

// ── Show store options below the locator ──────────────────
function showStoreOptions(location, isPincode) {
  // Remove any existing options box
  const existing = document.getElementById("store-options-box");
  if (existing) existing.remove();

  const storeSection = document.getElementById("store-section");
  if (!storeSection) return;

  const box = document.createElement("div");
  box.id = "store-options-box";
  box.style.cssText = `
    margin-top: 12px;
    background: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;

  const label = location
    ? `Showing stores for: <strong>${location}</strong>`
    : `Showing stores near your current location`;

  const bizbayaUrl = isPincode
    ? `https://www.bizbaya.com/jan-aushadhi-medical-stores/pincode/${location}`
    : `https://www.bizbaya.com/jan-aushadhi-medical-stores/city/${encodeURIComponent(location.toLowerCase().replace(/\s+/g, "-"))}`;

  const mapsQuery = location
    ? `Jan+Aushadhi+store+${encodeURIComponent(location)}`
    : `Jan+Aushadhi+store+near+me`;

  box.innerHTML = `
    <p style="margin:0;font-size:13px;color:#555;">${label}</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <a href="https://janaushadhi.gov.in/locate-kendra" target="_blank"
         style="flex:1;min-width:130px;padding:9px 10px;background:#2d7a3a;color:#fff;border-radius:8px;font-size:13px;text-align:center;text-decoration:none;font-weight:500;">
        🏥 Official Locator
      </a>
      <a href="https://www.google.com/maps/search/${mapsQuery}" target="_blank"
         style="flex:1;min-width:130px;padding:9px 10px;background:#fff;color:#333;border:1px solid #ddd;border-radius:8px;font-size:13px;text-align:center;text-decoration:none;font-weight:500;">
        🗺 Google Maps
      </a>
      ${location ? `
      <a href="${bizbayaUrl}" target="_blank"
         style="flex:1;min-width:130px;padding:9px 10px;background:#fff;color:#333;border:1px solid #ddd;border-radius:8px;font-size:13px;text-align:center;text-decoration:none;font-weight:500;">
        📋 Directory
      </a>` : ""}
    </div>
    <p style="margin:0;font-size:11px;color:#999;">
      ${isPincode ? "Tip: The Directory link shows stores by exact pincode with contact numbers." : "Tip: Try entering a 6-digit pincode for more precise results."}
    </p>
  `;

  storeSection.appendChild(box);
}

// ── Event listeners ───────────────────────────────────────
function initEventListeners() {
  const searchBtn = document.getElementById("search-btn");
  const medicineInput = document.getElementById("medicine-input");
  const storeBtn = document.getElementById("store-btn");
  const locationInput = document.getElementById("location-input");

  if (!searchBtn || !medicineInput || !storeBtn || !locationInput) {
    console.error("One or more required elements not found in DOM.");
    return;
  }

  // Search on button click
  searchBtn.addEventListener("click", () => {
    const results = searchMedicines(medicineInput.value);
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
  locationInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") findStore();
  });
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  await loadMedicines();
  initEventListeners();
});
