# USEHUB — Your Crypto Toolkit in One Link

> A curated hub of **185 +** tools, marketplaces, and services for crypto traders, DeFi users, builders, and founders — [usehub.xyz](https://usehub.xyz/)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-All_Rights_Reserved-orange)

---

## 🔎 Overview

**USEHUB** is a single-page web application that aggregates the most popular and useful Web3 resources into a clean, searchable directory. Instead of bookmarking dozens of links, users can browse, search, filter, and favorite everything from centralized exchanges and DEXs to airdrop trackers, on-chain data platforms, and Web3 job boards — all from one place.

### ✨ Key Features

| Feature | Description |
|---|---|
| **20 categories** | CEXs, DEXs, Perpetual DEXs, Prediction Markets, Blockchain Ecosystems, Wallets, Multisig, Bridges, ICO Platforms, Faucets, Fundraising, Fund Portfolios, Revoke & Permissions, Security, Airdrops, Trading Tools, On-chain Data, Learning Courses, Jobs |
| **Real-time search** | Instant filtering across tool names, descriptions, and category labels |
| **Sort options** | Name A-Z, Name Z-A, or by Category |
| **Favorites** | Heart any resource to build a personal shortlist — persisted in `localStorage` |
| **Dark / Light theme** | Toggle at any time; preference saved in `localStorage` |
| **Progressive loading** | "Load More" pagination (9 cards per batch) for fast initial paint |
| **Auto-fetched logos** | Each card tries to display the project's real favicon via Google S2 Favicon service, with an initials fallback |
| **Domain verification banner** | A security bar confirms users are on the official `usehub.xyz` domain |
| **Tally form integration** | "Add an App" and "Feedback" buttons open embedded Tally forms |
| **Support modal** | Dedicated donation / support dialog |
| **Mobile-first layout** | Responsive grid + slide-out drawer navigation on small screens |
| **Full SEO** | Open Graph, Twitter Card, JSON-LD structured data, canonical URL, sitemap, robots.txt |
| **Privacy Policy** | Separate HTML page with its own dark/light theme toggle |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **UI library** | React 18 |
| **Build tool** | Vite 5 |
| **Styling** | Tailwind CSS 4 (installed via npm) |
| **Forms** | Tally (embedded widget) |
| **State** | React `useState` / `useMemo` + `localStorage` |
| **Icons** | Custom inline SVG icon set |
| **Hosting** | Static — deploy anywhere (Vercel, Netlify, GitHub Pages, etc.) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (LTS recommended)
- **npm** (ships with Node)

### Install & Run

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/usehub-marketplace.git
cd usehub-marketplace

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open the URL printed in the terminal (usually **http://localhost:5173**).

### Build for Production

```bash
npm run build     # outputs to ./dist
npm run preview   # preview the production build locally
```


> The **"All in One"** view shows every resource, and **"My Favorites"** shows only the user's starred items.

---


## 🤝 Contributing

Want to **add a new tool** or **suggest an improvement**?

1. Click the **"Add an App"** button on the live site to submit via the Tally form.
2. Or open a pull request — add your entry to `src/data/tools.js` following the existing format:

```js
{
  id: "unique-id",
  name: "Tool Name",
  category: "category_key",
  blurb: "Short one-line description.",
  url: "https://example.com",
  createdAt: Math.floor(Date.now() / 1000)
}
```

---

## 📜 License

© 2026 USEHUB. All rights reserved.

---

## 📬 Contact

For questions, feedback, or partnership inquiries, use the **Feedback** button on [usehub.xyz](https://usehub.xyz/) or reach out via the channels listed in the Support modal.
