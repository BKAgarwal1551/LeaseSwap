# LeaseSwap Mobile (Expo)

Expo (React Native) app for LeaseSwap.

## Run
```bash
npm install
npx expo start -c --tunnel
```

## Firebase
Optional. Create `./.env` based on `./.env.example`.

```bash
cp .env.example .env
# fill FIREBASE_* values
npx expo start -c --tunnel
```

## Notes
- System theme is enabled (light/dark follows device).
- Gesture handler is configured for swipe cards.
