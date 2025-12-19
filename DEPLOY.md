# GitHub Pages Deployment Guide

## Deployment Steps

### Option 1: Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

This will build the project and push the `dist` folder to the `gh-pages` branch.

### Option 2: Automatic Deployment (GitHub Actions)

The project includes a GitHub Actions workflow that automatically deploys when you push to the `main` or `master` branch.

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select source: "GitHub Actions"
   - Save

The workflow will automatically build and deploy your site.

## Configuration

- **Base Path**: `/Kasibet/` (configured in `vite.config.js`)
- **Repository URL**: https://github.com/mvelo246/Kasibet
- **Live URL**: https://mvelo246.github.io/Kasibet

## Important Notes

1. **HashRouter**: The app uses `HashRouter` instead of `BrowserRouter` for GitHub Pages compatibility
2. **Base Path**: All routes will be prefixed with `/Kasibet/`
3. **Build Output**: The `dist` folder contains the production build

## Troubleshooting

### Routes not working
- Make sure you're using `HashRouter` (already configured)
- Check that the base path in `vite.config.js` matches your repository name

### 404 errors
- Clear browser cache
- Make sure GitHub Pages is enabled in repository settings
- Check that the `gh-pages` branch exists and has the `dist` folder

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (should be 18+)

