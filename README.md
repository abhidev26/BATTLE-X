# BATTLEZONE X
### *Enter the Zone. Survive. Dominate.*

> A production-quality, full-stack esports battle platform — built as an MCA-level advanced project.

---

## 🎮 Project Overview

**BATTLEZONE X** is a premium browser-based multiplayer battle arena platform. It combines a real-time battle engine, competitive matchmaking, player progression, inventory management, and a fully featured admin dashboard — all wrapped in the **RED + BLACK PROTOCOL** design system.

This is an original IP. No assets, characters, maps, or UI elements are copied from any existing game.

---

## ✨ Features

### Player Experience
- 🏆 **Ranked Matchmaking** — Skill-based queue for Solo, Duo, Squad, and TDM
- ⚔️ **Battle Arena** — Browser-based Phaser.js combat (Phase 4)
- 📈 **XP & Leveling** — Progressive rank system with missions and rewards
- 🎯 **Achievement System** — 30+ achievements with XP rewards
- 🎒 **Inventory** — Weapons, skins, characters, emotes, banners, badges
- 📊 **Leaderboards** — Global, weekly, monthly, friends categories
- 💬 **Real-time Chat** — Lobby, room, and team chat via Socket.IO

### Platform
- 🔐 **Authentication** — JWT + refresh tokens, OTP email verification
- 👤 **Player Profiles** — Detailed stats, match history, achievement showcase
- 🔔 **Notifications** — In-app notification center with push support
- 📱 **Responsive Design** — Full desktop gaming dashboard + mobile HUD

### Admin
- 🛡️ **Admin Dashboard** — Full CRUD control over users, matches, items
- 📉 **Analytics** — DAU, retention, mode popularity, revenue charts
- 🚩 **Report System** — Review and act on player reports
- 📢 **Announcements** — System-wide announcements

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool + dev server |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion | Animations + transitions |
| React Router v6 | Client-side routing |
| Recharts | Analytics charts |
| Socket.IO Client | Real-time communication |
| Lucide React | Icon library |
| Axios | HTTP client |

### Backend (Phase 2+)
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Primary database |
| Socket.IO | WebSocket server |
| JWT + bcrypt | Auth + password hashing |
| Redis | Session cache + matchmaking queue |

### Game Engine (Phase 4)
| Technology | Purpose |
|---|---|
| Phaser.js | Browser-based 2D game engine |
| Socket.IO | Real-time game state sync |

---

## 🏗️ Architecture

```
battlezone-x/
├── client/                     # React + Vite frontend
│   ├── public/
│   │   └── bz-icon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # Reusable UI components
│   │   │   │   ├── Avatar.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Notification.jsx
│   │   │   │   ├── ProgressBar.jsx
│   │   │   │   ├── ProtectedRoute.jsx
│   │   │   │   ├── RarityBadge.jsx
│   │   │   │   └── StatCard.jsx
│   │   │   └── layout/
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── NotificationContext.jsx
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx
│   │   ├── pages/
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── Landing.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── ForgotPassword.jsx
│   │   │   ├── dashboard/
│   │   │   │   └── Home.jsx
│   │   │   ├── lobby/
│   │   │   │   ├── Lobby.jsx
│   │   │   │   ├── Matchmaking.jsx
│   │   │   │   └── GameRoom.jsx
│   │   │   ├── profile/
│   │   │   │   └── Profile.jsx
│   │   │   ├── inventory/
│   │   │   │   └── Inventory.jsx
│   │   │   ├── leaderboard/
│   │   │   │   └── Leaderboard.jsx
│   │   │   ├── achievements/
│   │   │   │   └── Achievements.jsx
│   │   │   ├── matches/
│   │   │   │   └── Matches.jsx
│   │   │   ├── settings/
│   │   │   │   └── Settings.jsx
│   │   │   ├── admin/
│   │   │   │   ├── AdminLayout.jsx
│   │   │   │   ├── AdminOverview.jsx
│   │   │   │   ├── AdminUsers.jsx
│   │   │   │   ├── AdminAnalytics.jsx
│   │   │   │   └── AdminReports.jsx
│   │   │   └── error/
│   │   │       ├── NotFound.jsx
│   │   │       └── Unauthorized.jsx
│   │   ├── utils/
│   │   │   └── mockData.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                     # Express backend (Phase 2)
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   ├── sockets/
│   ├── utils/
│   └── config/
│
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+
- npm 9+ or yarn
- MongoDB 7+ (Phase 2)

### Phase 1 — Frontend Only

```bash
# Clone the repository
git clone https://github.com/yourorg/battlezone-x.git
cd battlezone-x

# Install frontend dependencies
cd client
npm install

# Start the development server
npm run dev
```

Open http://localhost:3000

---

## ⚙️ Environment Variables

Create `client/.env.local`:
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
VITE_APP_NAME=BATTLEZONE X
```

Create `server/.env` (Phase 2):
```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/battlezone-x

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Email (Phase 2)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@email.com
EMAIL_PASS=your-app-password

# Redis (Phase 5)
REDIS_URL=redis://localhost:6379

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

> ⚠️ **Never commit `.env` files. Only commit `.env.example`.**

---

## 🗄️ Database Setup (Phase 2)

```bash
# Start MongoDB
mongod --dbpath ./data/db

# Collections created automatically by Mongoose:
# users, profiles, matches, matchPlayers, rooms,
# weapons, inventory, items, achievements,
# playerAchievements, missions, notifications,
# messages, reports, leaderboards
```

---

## 📡 API Documentation (Phase 2)

### Authentication
```
POST /api/auth/register      Register new player
POST /api/auth/login         Login + get JWT
POST /api/auth/logout        Invalidate refresh token
POST /api/auth/refresh       Refresh access token
POST /api/auth/verify-otp    Verify email OTP
POST /api/auth/forgot        Send reset link
POST /api/auth/reset         Reset password
```

### Player
```
GET  /api/player/profile     Get own profile
PUT  /api/player/profile     Update profile
GET  /api/player/stats       Get stats
GET  /api/player/:id         Get any player profile
```

### Matches
```
GET  /api/matches            Match history
POST /api/matches/create     Create new match
POST /api/matches/join       Join match queue
GET  /api/matches/:id        Match details
```

### Inventory
```
GET  /api/inventory          Get player inventory
POST /api/inventory/equip    Equip item
POST /api/inventory/unequip  Unequip item
```

### Leaderboard
```
GET  /api/leaderboard?type=global&limit=50
GET  /api/leaderboard?type=weekly
GET  /api/leaderboard?type=monthly
```

### Achievements
```
GET  /api/achievements           All achievements
GET  /api/achievements/player    Player's progress
POST /api/achievements/check     Check & award achievements
```

### Admin
```
GET    /api/admin/users          List users
PUT    /api/admin/users/:id      Update user
DELETE /api/admin/users/:id      Delete user
POST   /api/admin/suspend/:id    Suspend user
GET    /api/admin/stats          Platform analytics
GET    /api/admin/reports        All reports
PUT    /api/admin/reports/:id    Update report status
```

---

## 🔌 Socket.IO Events (Phase 3)

### Client → Server
```
player:join         Join matchmaking queue
player:leave        Leave queue
player:move         Send movement input
player:shoot        Fire weapon
room:join           Join a game room
room:leave          Leave room
room:ready          Toggle ready status
chat:message        Send chat message
```

### Server → Client
```
player:damage       Receive damage event
player:eliminated   Player eliminated notification
player:respawn      Respawn event
room:update         Room state changed
match:found         Match created, players assigned
match:start         Match starting countdown
match:end           Match over, results
zone:update         Safe zone position/size update
chat:message        Incoming chat message
notification:new    New notification
leaderboard:update  Real-time rank update
```

---

## 🎮 Build Phases

| Phase | Status | Contents |
|---|---|---|
| **Phase 1** | ✅ Current | React frontend, full UI, mock data, all pages |
| **Phase 2** | 🔜 Next | Express API, MongoDB, JWT auth, real player data |
| **Phase 3** | 🔜 Planned | Socket.IO, rooms, matchmaking, real-time chat |
| **Phase 4** | 🔜 Planned | Phaser.js battle arena, game engine, combat |
| **Phase 5** | 🔜 Planned | Redis, Docker, CI/CD, production optimization |

---

## 🧪 Testing (Phase 5)

```bash
# Frontend unit tests
cd client && npm test

# API integration tests  
cd server && npm test

# E2E tests
npm run test:e2e
```

---

## 🎨 Design System

### RED + BLACK PROTOCOL

| Token | Value | Usage |
|---|---|---|
| `bz-black` | `#050505` | Primary background |
| `bz-surface` | `#111111` | Card backgrounds |
| `bz-red` | `#ff1a1a` | Primary accent, CTA buttons |
| `bz-gold` | `#ffd700` | Ranks, achievements, rewards |
| `bz-green` | `#00ff88` | Online indicators, wins |
| `bz-cyan` | `#00d4ff` | Secondary accent |

---

## 📸 Screenshots

> *Phase 1 UI screenshots to be added*

---

## 🔮 Future Improvements

- Voice chat integration (WebRTC)
- Clan/guild system
- Seasonal battle pass
- NFT-based cosmetics (optional)
- Mobile companion app
- Twitch/YouTube stream integration
- Anti-cheat system
- Regional game servers (AWS GameLift)
- Replay system
- Spectator mode

---

## 📄 License

This project is original work for educational/portfolio purposes. 
BATTLEZONE X is not affiliated with any existing game title.

---

*Built with ❤️ and 🔴 by the BATTLEZONE X team*
