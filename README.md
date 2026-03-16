# QuoteSpace — Daily Quote App

A clean, modern React Native app that delivers daily motivational quotes with a beautiful UI. Save your favorites, share inspiration, and enjoy animated gradient backgrounds.

## Features

### Core
- **Daily Quotes** — Fetches fresh motivational quotes from the [API Ninjas Quotes API](https://api-ninjas.com/api/quotes)
- **Favorites** — Save quotes you love locally using AsyncStorage (persists across app restarts)
- **Favorites Screen** — Browse and manage all your saved quotes in one place

### Bonus
- **Share Quotes** — Share any quote via your device's native share sheet
- **Animated Gradient Backgrounds** — Smooth, eye-catching gradient transitions behind each quote
- **Clean Animations** — Polished transitions and micro-interactions for a premium feel

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native CLI | Cross-platform mobile framework |
| React Navigation | Screen routing and navigation |
| AsyncStorage | Local persistence for favorite quotes |
| React Native Linear Gradient | Animated gradient backgrounds |
| TypeScript | Type safety and better developer experience |

## Project Structure

```
src/
├── components/       # Reusable UI components (QuoteCard, GradientBackground, etc.)
├── screens/          # App screens (HomeScreen, FavoritesScreen)
├── navigation/       # Navigation configuration and stack setup
├── services/         # API calls and external service integrations
├── hooks/            # Custom React hooks
├── utils/            # Helper functions and constants
├── types/            # TypeScript type definitions
└── assets/           # Fonts, images, and other static assets
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- React Native CLI development environment set up ([official guide](https://reactnative.dev/docs/set-up-your-environment))
- Android Studio (for Android) and/or Xcode (for iOS)
- An API key from [API Ninjas](https://api-ninjas.com/) (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/Csasaka19/Quote-Space.git
cd Quote-Space

# Install dependencies
npm install

# iOS only: install CocoaPods
cd ios && pod install && cd ..

# Start the Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Environment Setup

Create a `.env` file in the project root with your API Ninjas key:

```env
API_NINJAS_KEY=<your_key>
```

> Sign up for a free API key at [api-ninjas.com/register](https://api-ninjas.com/register). The `.env` file is gitignored and will not be committed.

## Architecture Overview

QuoteSpace follows a clean, modular architecture:

- **Screens** handle layout and orchestrate components
- **Components** are small, reusable, and focused on a single responsibility
- **Services** abstract API calls away from UI logic
- **Hooks** encapsulate stateful logic for reuse across screens
- **Types** provide shared TypeScript interfaces

> **Coming from Flutter?** Think of Screens as your `StatefulWidget` pages, Components as your custom widgets, Services as your repository layer, and Hooks as a replacement for `ChangeNotifier`/`Provider` logic.

## API Reference

This app uses the [API Ninjas Quotes API](https://api-ninjas.com/api/quotes):

```
GET https://api.api-ninjas.com/v1/quotes
Header: X-Api-Key: <your_key>
```

Returns an array of quote objects:
```json
[
  {
    "quote": "The best way to predict the future is to create it.",
    "author": "Peter Drucker",
    "category": "inspirational"
  }
]
```

## Contributing

Contributions are welcome! Here's how to get involved:

1. **Fork** this repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow the existing folder structure under `src/`
- Write clean, modular components — one component per file
- Use TypeScript for all new files
- Test on both Android and iOS before submitting
- Keep PRs focused — one feature or fix per PR

## Evaluation Criteria

| Criteria | Focus |
|---|---|
| Code Quality | Clean, modular, reusable components |
| UI Design | Visually appealing, responsive, consistent |
| State Management | Proper use of hooks and local state |
| API Integration | Async handling with loading and error states |
| Project Structure | Organized directories and readability |
| Bonus | Animations, gradient themes, share functionality |

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Quotes provided by [API Ninjas](https://api-ninjas.com/)
- Built with [React Native](https://reactnative.dev/)
