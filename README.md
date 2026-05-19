# Arthasetu Financial Advisory Portal 📈

[![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/github/license/Rakeshgr962/arthasetu-website?style=flat-square)](LICENSE)

**Arthasetu** (Bridge to Wealth) is an interactive, responsive financial strategy and wealth advisory portal. The application is built to help users evaluate financial strategies, calculate compound interest and SIP returns with high accuracy, and visualize mutual fund or equity portfolio breakdowns.

---

## ✨ Features
- **SIP Calculator**: Precise calculations for monthly SIP schemes accounting for compounding periods and inflation metrics.
- **Wealth Strategist**: Strategy mapping templates based on user financial profiles.
- **Portfolio Visualizer**: Local modules demonstrating equity and mutual fund asset allocation categories.
- **User Dashboard**: Client portals summarizing wealth strategies, active funds, and learning courses.

---

## 🛠️ Tech Stack
- **Frontend Layout**: Semantic HTML5, Custom CSS3 Grid/Flexbox Layouts
- **Interactive Logic**: Vanilla JavaScript (ES6 Modules)
- **Icons**: FontAwesome Web Icons

---

## 🚀 Getting Started

### Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Rakeshgr962/arthasetu-website.git
   cd arthasetu-website
   ```

2. **Serve files**:
   Since the project consists of static files with JavaScript modules, you can run a simple local web server:
   ```bash
   # Using Python (built-in)
   python -m http.server 8000
   ```
   *Open `http://localhost:8000/arthasetu-website/index.html` in your browser.*

---

## 📂 Project Structure
```
arthasetu-website/
└── arthasetu-website/           # Core static portal directory
    ├── index.html               # Main landing page
    ├── portfolio-management.html# Wealth allocator and portfolios page
    ├── fund-choosing.html       # Interactive mutual fund guides
    ├── auth.js                  # Client authentication handlers
    ├── sip-calculator-accurate.js # SIP computational logic
    └── dashboard.js             # User data dashboard updates
```

---

## 📄 License
Distributed under the MIT License. See [LICENSE](LICENSE) for details.
