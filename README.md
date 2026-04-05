# 💊 Jan Aushadhi Mitra

> **Affordable Medicines for Every Indian**  
> जन औषधि – दाम कम, दवाई उत्तम

A clean, fast, mobile-friendly website to search Jan Aushadhi generic medicines and locate nearby Jan Aushadhi Kendras across India.

---

## ✨ Features

- 🔍 **Live Medicine Search** — search by medicine name, generic ingredient, category, or use case
- 💰 **Price Comparison** — see Jan Aushadhi prices vs branded equivalents with savings %
- 📍 **Store Locator** — redirects to official Jan Aushadhi store locator with your city/pincode
- 📱 **Fully Responsive** — works great on mobile, tablet, and desktop
- ⚡ **No backend needed** — pure HTML, CSS, and JavaScript

---

## 📁 Project Structure

```
jan-aushadhi-mitra/
├── index.html        # Main HTML page
├── style.css         # All styles (responsive, themed)
├── app.js            # Search logic, store locator, event handling
├── medicines.json    # Medicine data (15 common drugs with prices)
└── README.md         # This file
```

---

## 🚀 Getting Started

### Run locally

Just open `index.html` in any browser — no server or install needed.

```bash
# Or serve with a simple HTTP server (recommended for fetch() to work):
npx serve .
# OR
python3 -m http.server 8080
```

Then visit `http://localhost:8080`

### Deploy to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

---

## 💊 Medicine Data (`medicines.json`)

Each entry contains:

| Field | Description |
|---|---|
| `id` | Unique ID |
| `name` | Medicine name + strength |
| `generic_name` | Active pharmaceutical ingredient |
| `category` | Drug category (e.g. Antibiotic) |
| `uses` | Common uses |
| `jan_aushadhi_price` | Price at Jan Aushadhi Kendra (₹) |
| `branded_price` | Typical branded equivalent price (₹) |
| `branded_example` | Example branded drug name |
| `unit` | Pack size (strip, sachet, etc.) |

To add more medicines, simply append entries to `medicines.json` following the same format.

---

## 🎨 Design

| | |
|---|---|
| **Fonts** | Playfair Display (headings) + DM Sans (body) |
| **Primary color** | Forest Green `#2e7d32` |
| **Accent color** | Saffron `#e65100` |
| **Background** | Warm cream `#fff8f0` |

---

## 🔗 Useful Links

- [Official Jan Aushadhi Portal](https://janaushadhi.gov.in)
- [Store Locator](https://janaushadhi.gov.in/StoreLocater.aspx)
- [Medicine Price List (PDF)](http://janaushadhi.gov.in/Data/pmbjp-book.pdf)
- [PM Bhartiya Jan Aushadhi Pariyojana](https://pmbjp.gov.in)

---

## 📜 License

This project is open source and free to use for educational and public welfare purposes.  
Built with ❤️ for India.
