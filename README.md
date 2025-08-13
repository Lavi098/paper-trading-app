📱 Indian Stock Market Paper Trading App
A high-quality, mobile-only social paper trading app built using React Native . It simulates real trading in the Indian stock market, for  Options, allowing users to learn, practice, and compete without real money.

🚀 Features
📈 Live-like Market Simulation
Real-time position updates, P&L tracking, and margin management.

💰 Paper Trading Engine
Simulated options equity trades.

🧠 Performance Tracking
Auto-logs closed positions in the Performance screen with visual P&L.

💼 Position Management
Real-time updates for open positions with ability to close trades.

🔒 Auth Screens
Seamless login/signup flow.

🌙 Modern UI
Clean, professional UI inspired by FrontPage and Groww (Charcoal theme #1C1C1E).

🛠️ Tech Stack
React Native CLI

TypeScript

Redux Toolkit (state management)

AsyncStorage (for local persistence)

React Navigation / Expo Router

Glassmorphism UI & Soft Card UI (configurable)

📁 Folder Structure
pgsql
Copy code
.
├── assets/
├── components/
│   └── TradeModal.tsx
├── screens/
│   ├── AuthScreen.tsx
│   ├── PositionScreen.tsx
│   ├── PerformanceScreen.tsx
│   └── MarketScreen.tsx
├── slices/
│   ├── userSlice.ts
│   └── tradeSlice.ts
├── store/
│   └── store.ts
├── navigation/
│   └── index.tsx
├── App.tsx
└── index.tsx
🧪 Setup Instructions
Clone the repo

bash
Copy code
git clone https://github.com/your-username/indian-paper-trading.git
cd indian-paper-trading
Install dependencies


🧠 State Management (Redux Slices)
userSlice
Manages availableMargin, loggedIn status, and auth logic.

tradeSlice
Manages openPositions, performanceHistory, addPosition, closePosition, calculatePnl, etc.

🔄 Core Logic
Every new trade adds a position to the store with uuid, entry, qty, type, symbol, and ltp.

Real-time LTP updates simulate market movement.

Exiting a trade moves it from open position to performance history and restores margin.

P&L color coding:
🟢 Profit → #00FF8F
🔴 Loss → #FF3B30

🧑‍💻 Contribution
Want to improve the app, refactor logic, or add features like leaderboards, watchlists, or price alerts?

Fork the repo

Create a branch: git checkout -b feature-new-feature

Commit your changes: git commit -m "Add new feature"

Push to the branch: git push origin feature-new-feature

Open a pull request

