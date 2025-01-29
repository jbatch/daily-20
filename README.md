# D20 Game

A daily number placement puzzle game where players strategically place random numbers (1-999) into a 20-cell grid to create the longest possible ascending sequence. Each day presents a new puzzle that's the same for all players worldwide.

## 🎮 Gameplay

- Every day, you'll receive 20 random numbers between 1 and 999
- Numbers appear one at a time
- Place each number in the grid strategically
- Your goal is to create the longest possible ascending sequence
- Numbers can form ascending sequences in any direction
- Your score is based on how close each number is to its optimal position

## 🛠️ Technical Stack

- [Vite](https://vitejs.dev/) - Build tool and development server
- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- Local Storage - Data persistence

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/jbatch/daily-20.git
cd daily-20
```

2. Install dependencies:

```bash
yarn
```

3. Start the development server:

```bash
yarn dev
```

4. Build for production:

```bash
yarn build
```

## 🎯 Key Features

### Daily Puzzles

- Consistent puzzle generation using date-based seeding
- Same sequence of numbers for all players on a given day
- New puzzle available every day at midnight

### Scoring System

- Tracks the optimal placement of each number
- Calculates score based on position accuracy
- Visual feedback through color-coding
- Maintains player statistics and streaks

### Share Functionality

Players can share their daily results with an emoji grid:

```
D20 #123
Score: 85/100

🟩🟨🟨🟥
🟨🟩🟨🟧
🟩🟩🟨🟨
🟨🟧🟥🟥
```

### Local Storage

- Saves daily scores and progress
- Tracks current and maximum streaks
- Records total games played
- Maintains score distribution
- Stores player placement history
