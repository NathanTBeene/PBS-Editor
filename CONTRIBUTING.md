# Contributing

If you would like to contribute to the project, please follow the guidelines below.

> [!NOTE]
> Contributions are up to the repository owner and all pull-requests will be accepted on a case-by-case basis, not simply if they have no conflicts.

#### 1. Fork the repo
```bash
# Click the "Fork" button on GitHub, then clone your fork
git clone https://github.com/your-username/PBS-Editor.git
cd PBS-Editor
```

#### 2. Set up development environment
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

#### 3. Create a feature branch
```bash
# Create and switch to a new branch for your feature
git checkout -b feature/your-feature-name
```

#### 4. Make your changes
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Test your changes thoroughly
- Ensure your code passes linting: `npm run lint`

#### 5. Commit your changes
```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Add: brief description of your changes"
```

#### 6. Push and create a pull request
```bash
# Push your branch to your fork
git push origin feature/your-feature-name

# Go to GitHub and create a pull request from your branch
```

### Pull Request Guidelines
- Provide a clear description of what your changes do
- Reference any related issues
- Include screenshots for UI changes
- Ensure all tests pass and no new warnings are introduced
- Keep pull requests focused on a single feature or bug fix

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for complex functions
- Use meaningful variable and function names
- Keep components small and focused

### Reporting Issues
- Use the GitHub issue tracker
- Provide clear reproduction steps
- Include browser/environment information
- Add screenshots for visual bugs
