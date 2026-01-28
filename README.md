# LeaseSwap

A swipe-first marketplace prototype for rental listings and lease swaps.

This repository contains two apps:

- **`mobile/`**: Expo (React Native) mobile app (current focus)
- **`web-prototype/`**: Original Vite + React UI prototype (kept for reference)

> Status: MVP/demo. UI flows work; backend is partially scaffolded (Firestore listings). Authentication, real matching, and chat persistence are next.

---

## Quick start (Mobile)

### Prerequisites
- Node.js (LTS recommended)
- Git
- Expo Go on your phone (iOS/Android)

### 1) Clone and checkout the working branch
```bash
git clone https://github.com/BKAgarwal1551/LeaseSwap.git
cd LeaseSwap
# current development branch
git checkout feature/mobile-expo-init
```

### 2) Install and run
```bash
cd mobile
npm install
npx expo start -c --tunnel
```

### 3) Open on your phone
- **iOS**: use Camera app to scan the QR → open in Expo Go
- **Android**: open Expo Go → Scan QR

If you see connection errors:
- Ensure the dev server is running
- Use `--tunnel` (recommended) when phone and dev machine are on different networks

---

## Firebase (optional)

The mobile app can run without Firebase (demo mode). If Firebase env vars are configured, the app will:
- publish listings to Firestore from **Create Listing**
- fetch listings from Firestore on **Discover**

### Setup
1) Create a Firebase project
2) Enable **Firestore** (test mode for MVP)
3) Create a Web App and copy config values
4) Create `mobile/.env` based on `mobile/.env.example`

```bash
cp .env.example .env
# fill in FIREBASE_* values
```

Restart Expo after editing `.env`:
```bash
npx expo start -c --tunnel
```

> Note: `.env` is ignored by git and should not be committed.

---

## Web prototype

Run the original web prototype:
```bash
cd web-prototype
npm install
npm run dev
```

---

## Repo structure

```
LeaseSwap/
  mobile/           # Expo / React Native app
  web-prototype/    # Vite / React UI prototype
```

---

## Roadmap (next)

- Auth (phone/email)
- Listing creation with photos (Firebase Storage)
- Real Like/Match model and persistence
- Chat persistence (threads/messages)
- Filters (suburb/state/rent/beds)
- Payment (pay per listing) – later

---

## Contributing

1) Create a branch
2) Commit small, reviewable changes
3) Open a PR

---

## License

TBD
