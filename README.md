# Pokemon Essentials PBS Editor

A modern React application for editing Pokemon Essentials PBS (Pokemon Battle System) data files with a user-friendly interface, eliminating the need to manually edit raw text files.

## Overview

> [!NOTE]
> Importing functionality has not yet been implemented, however it's the next thing I'm working on.

Provides a visual editor for Pokemon Essentials PBS data, letting you:

- **Manage Pokemon**: Create, edit, and manage Pokemon data including stats, types, abilities, moves, and more
- **Edit Moves**: Define and modify moves with their properties, effects, and battle mechanics
- **Alter Abilities**: Create and edit Pokemon abilities with descriptions and flags
- **Live Preview**: See changes instantly without switching between files
- **Export Functionality**: Export your edited data back to PBS format for use in Pokemon Essentials

## Features

### Pokemon Editor
- Base stats configuration (HP, Attack, Defense, etc.)
- Type assignments with visual type bubbles
- Ability management with multiple ability slots
- Moveset configuration (level-up, TM, egg moves)
- Physical attributes (height, weight, gender ratios)
- Game mechanics (catch rate, base experience, growth rate)
- Breeding information (egg groups, compatibility)
- Wild held items configuration

### Move Editor
- Basic move properties (name, type, category, power, accuracy)
- Advanced mechanics (priority, critical hit ratio, effect chance)
- Move flags and target configuration
- Description and effect management

### Ability Editor
- Ability descriptions and in-game text
- Flag system for ability properties
- Battle and field effect configuration

### Technical Features
- **React 19** with modern hooks and state management
- **TypeScript** for type safety
- **Tailwind CSS** for responsive styling
- **IndexedDB** for local data persistence
- **Vite** for fast development and building
- **Modular architecture** with reusable components

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/PBS-Editor.git
cd PBS-Editor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built application will be available in the `dist` directory.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Project Structure
```
src/
  components/          # React components
    pokemon/           # Pokemon-specific components
    move/              # Move editor components
    ability/           # Ability editor components
    ui/                # Reusable UI components
    layout/            # Layout components
  lib/
    hooks/             # Custom React hooks
    models/            # Data models and types
    services/          # Business logic and utilities
    providers/         # React context providers
  routes/              # Page components
  assets/              # Static assets including sample PBS files
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built for the Pokemon Essentials community
- Inspired by the need for better PBS data management tools