# Arthasetu — Financial Advisory Portal 📈

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/Rakeshgr962/arthasetu-website?style=flat-square)](https://github.com/Rakeshgr962/arthasetu-website)

---

## What it does

Arthasetu ("Bridge to Wealth" in Sanskrit) is a financial planning web portal. It gives users tools to evaluate investment strategies, calculate SIP (Systematic Investment Plan) returns with compounding precision, explore mutual fund categories, and track a simulated investment portfolio.

The core tools:

- **SIP Calculator** — input your monthly amount, interest rate, and duration, get exact projected returns accounting for monthly compounding. Not a simple formula — it handles inflation adjustment and quarterly vs. annual compounding variations.
- **Fund Selector** — browse mutual fund categories (equity, debt, hybrid) with allocation breakdowns and risk profiles.
- **Portfolio Dashboard** — visual summary of wealth strategy, active fund positions, and projected milestones.
- **Wealth Strategy Module** — generates a personalized strategy map based on a user's financial profile inputs (age, income, risk tolerance, goal horizon).

---

## Why it matters

Most personal finance apps either over-simplify (just multiply amount × rate) or require an account and personal data. Arthasetu runs entirely client-side — no server, no data collection, no sign-up. The SIP calculator (`sip-calculator-accurate.js`) uses proper iterative compounding logic that matches what actual fund houses use in their NAV calculations, not the approximation formulas most online tools provide.

This makes it useful for students and first-time investors who want to understand the math behind their investments without trusting a black-box platform with their data.

---

## How to use it

No installation required. The entire app is static HTML + JavaScript.

```bash
# Clone the repo
git clone https://github.com/Rakeshgr962/arthasetu-website.git
cd arthasetu-website/arthasetu-website

# Serve it locally (use any static server)
python -m http.server 8000
```

Open `http://localhost:8000` in your browser.

### Using the SIP calculator

1. Navigate to the **SIP Calculator** section
2. Enter: **Monthly Investment** (e.g. ₹5,000), **Expected Annual Return** (e.g. 12%), **Investment Duration** (e.g. 10 years)
3. The calculator returns: **Total Invested**, **Estimated Returns**, and **Maturity Value** with a compounding breakdown

### Exploring fund strategies

Go to **Fund Choosing** → browse category cards (Large Cap, Mid Cap, ELSS, Debt) → click any fund to see risk rating, recommended horizon, and sample allocation.

---

## Project structure

```
arthasetu-website/
└── arthasetu-website/
    ├── index.html                   # Landing page and navigation hub
    ├── portfolio-management.html    # Wealth allocation and portfolio tracker
    ├── fund-choosing.html           # Mutual fund browser and category explorer
    ├── wealth-strategy.html         # Personalized strategy generator
    ├── auth.js                      # Client-side login/session handling
    ├── sip-calculator-accurate.js   # Core SIP computation engine
    │                                # Uses iterative monthly compounding:
    │                                # FV = P × [((1 + r)^n - 1) / r] × (1 + r)
    ├── dashboard.js                 # Portfolio dashboard state updates
    └── utils.js                     # Shared formatting and calculation helpers
```

---

## Running without Python

Any static server works:
```bash
# Node.js (if installed)
npx serve .

# VS Code Live Server extension — right-click index.html → Open with Live Server
```

---

## License

MIT — see [LICENSE](LICENSE).
