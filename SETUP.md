# KasiBet Setup Instructions

## Prerequisites

You need to install Node.js (version 18 or higher) to run this project.

### Install Node.js

**Option 1: Download from official website (Recommended)**
1. Visit https://nodejs.org/
2. Download the LTS (Long Term Support) version for macOS
3. Run the installer and follow the instructions
4. Verify installation by opening a terminal and running:
   ```bash
   node --version
   npm --version
   ```

**Option 2: Install using Homebrew (if you have it)**
```bash
brew install node
```

## Running the Project

Once Node.js is installed:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   The terminal will show a local URL (usually http://localhost:5173)
   Open that URL in your browser to see the site.

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Troubleshooting

If you encounter any issues:
1. Make sure Node.js version is 18 or higher
2. Delete `node_modules` folder and `package-lock.json` if they exist
3. Run `npm install` again
4. Check that all files are in place

