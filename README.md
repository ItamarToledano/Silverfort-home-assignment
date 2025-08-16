# Multisession Web Game - Silverfort Assignment

A real-time multiplayer web game built with NestJS, React, TypeScript, Socket.IO, and Material-UI that supports simultaneous access from multiple browser tabs or devices.

## Features

- **3x6 Grid Game Board**: Each cell contains a randomly selected shape and color
- **Real-time Multisession Support**: Multiple clients can play simultaneously with synchronized game state
- **Smart Validation**: Cells cannot have the same shape or color as adjacent cells
- **Cooldown System**: Clicked cells enter a 3-turn cooldown period
- **Scoring System**: +1 point for each valid move
- **Game Over Detection**: Game ends when no valid moves are possible
- **Leaderboard System**: Track high scores with nicknames
- **Modern UI**: Beautiful Material-UI components with dark theme
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Backend**: NestJS with TypeScript
- **Frontend**: React with TypeScript and Material-UI
- **Real-time Communication**: Socket.IO
- **Styling**: Material-UI with custom theme

## Game Rules

### Setup

- Grid Size: 3 rows × 6 columns
- Shapes: Triangle, Square, Diamond, Circle
- Colors: Red, Green, Blue, Yellow
- Initial board is generated with valid combinations

### Gameplay

1. Click on any cell to change its shape and color
2. New values must be valid (different from adjacent cells)
3. Valid moves increase your score by 1
4. Clicked cells enter a 3-turn cooldown
5. Game continues until no valid moves are possible

### Validation Rules

- Only horizontal and vertical adjacency matters (no diagonal checks)
- New shape must differ from all adjacent shapes
- New color must differ from all adjacent colors

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

```bash
# Install dependencies
npm install

# Start the NestJS server in development mode
npm run server:dev
```

The server will run on `http://localhost:3001`

### Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the React development server
npm start
```

The client will run on `http://localhost:3000`

### Development Mode (Both servers)

```bash
# From the root directory
npm run dev
```

This will start both the backend and frontend servers simultaneously.

## Project Structure

```
├── server/                 # NestJS backend source
│   ├── main.ts            # Application entry point
│   ├── app.module.ts      # Main module configuration
│   └── game/              # Game-related modules
│       ├── game.types.ts      # TypeScript interfaces
│       ├── game.service.ts    # Game logic and state management
│       └── game.gateway.ts    # WebSocket gateway
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── types.ts       # TypeScript types
│   │   ├── App.tsx        # Main application component
│   │   └── index.tsx      # Application entry point
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── package.json           # Backend dependencies
├── nest-cli.json         # NestJS configuration
└── tsconfig.json         # TypeScript configuration
```

## API Endpoints

### WebSocket Events

#### Client to Server

- `makeMove`: Send a move (row, col)
- `resetGame`: Reset the game
- `getLeaderboard`: Request leaderboard data
- `addToLeaderboard`: Add a score to leaderboard

#### Server to Client

- `gameState`: Current game state update
- `gameOver`: Game over notification
- `leaderboard`: Leaderboard data

## Game Features

### Real-time Synchronization

- All connected clients see the same game board
- Game state updates are broadcast to all clients
- No user authentication required - anyone can join

### Cooldown System

- Clicked cells show a visual cooldown indicator
- Cooldown decreases by 1 each turn
- Cells become clickable again after cooldown expires

### Leaderboard System

- Top 10 scores are maintained
- Scores include nickname and timestamp
- Leaderboard persists across game sessions

### Responsive Design

- Works on desktop and mobile devices
- Adaptive grid sizing for different screen sizes
- Touch-friendly interface

## Bonus Features Implemented

### Bonus 1: Leaderboard

- ✅ High score tracking with nicknames
- ✅ Top 10 scores maintained
- ✅ Historical score persistence
- ✅ Dedicated leaderboard button

### Bonus 2: SVG/Canvas UI

- ✅ SVG-based shape rendering
- ✅ Beautiful, scalable graphics
- ✅ Smooth animations and transitions
- ✅ Modern Material-UI design

## Development Notes

- The game uses a single shared game instance
- All clients collaborate on the same game
- Real-time updates ensure consistent gameplay
- No database required - leaderboard is stored in memory
- Modern Material-UI components with custom dark theme

## Running the Game

1. Start the backend server: `npm run server:dev`
2. Start the frontend client: `cd client && npm start`
3. Open multiple browser tabs to `http://localhost:3000`
4. Play the game simultaneously across all tabs!

## Troubleshooting

- Ensure both servers are running (backend on 3001, frontend on 3000)
- Check browser console for connection errors
- Verify CORS settings if experiencing connection issues
- Restart servers if game state becomes inconsistent

## Future Enhancements

- Database persistence for leaderboard
- User authentication and personal statistics
- Multiple game rooms
- Spectator mode
- Game replay functionality
