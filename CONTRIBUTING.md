# Contributing to FocusPath

First off, thank you for considering contributing to FocusPath! It's people like you that make FocusPath such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Be respectful and inclusive
- Focus on the issue at hand
- Maintain privacy and security
- Help others learn and grow

## How Can I Contribute?

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/RajeshKalidandi/focuspath/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment details

### Suggesting Enhancements

1. First, read the [documentation](README.md)
2. Search for existing enhancement requests
3. Create a new issue with:
   - Clear title and description
   - Detailed explanation of the feature
   - Potential implementation approach
   - Use cases and benefits

### Pull Requests

1. Fork the repository
2. Create a new branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Follow our coding standards:
   - Use TypeScript
   - Follow ESLint rules
   - Write meaningful commit messages
   - Add tests if applicable
5. Run tests: `npm test`
6. Push to your fork
7. Create a Pull Request

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Run tests:
```bash
npm test
```

## Project Structure

```
focuspath/
├── landing/                 # PWA Installation Landing Page
├── src/                    # Main FocusPath App
│   ├── components/        # Reusable UI components
│   ├── lib/              # Utility functions
│   ├── pages/            # App pages
│   ├── store/            # State management
│   └── App.tsx           # Root component
└── supabase/              # Database configuration
```

## Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Start with [Cursor] to maintain consistency
- Limit the first line to 72 characters
- Reference issues and pull requests liberally after the first line

Example:
```
[Cursor] Add amazing new feature

This adds an amazing new feature that helps users track their progress.
Closes #123
```

## Questions?

Feel free to reach out to us:
- Create an issue
- Email: support@rajeshkalidandi.online
- Join our community discussions

## License

By contributing, you agree that your contributions will be licensed under its MIT License. 