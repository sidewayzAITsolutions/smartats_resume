# Contributing to SmartATS Resume

Thank you for your interest in contributing to SmartATS Resume! We welcome contributions from the community and are excited to see what you'll bring to the project.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful, inclusive, and constructive in all interactions.

## ⚠️ Contribution Policy

**IMPORTANT**: All contributions to this repository are subject to approval by the repository maintainers. No changes will be merged without explicit consent from the project maintainers. Please open issues or pull requests for discussion before submitting any changes.

- All pull requests require maintainer approval before merging
- Contributions must align with the project's vision and goals
- The maintainers reserve the right to reject any contribution for any reason
- Please discuss significant changes in an issue before implementing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Git
- A GitHub account
- Basic knowledge of React, Next.js, and TypeScript

### Setting Up Your Development Environment

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/SmartATS-Resume.git
   cd SmartATS-Resume
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Fill in your environment variables
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📋 How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

**When submitting a bug report, please include:**
- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node.js version)
- Error messages or console logs

### Suggesting Features

We love feature suggestions! Please:
- Check existing feature requests first
- Provide a clear description of the feature
- Explain the use case and benefits
- Consider the scope and complexity

### Pull Requests

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow our coding standards
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm run lint
   npm run build
   npm run test
   ```

4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing new feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use a clear, descriptive title
   - Reference any related issues
   - Provide a detailed description of changes
   - Include screenshots for UI changes

## 🎨 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use meaningful variable and function names

```typescript
// Good
interface ResumeData {
  personalInfo: PersonalInfo;
  experience: WorkExperience[];
  skills: string[];
}

// Avoid
const data: any = {};
```

### React Components

- Use functional components with hooks
- Follow the single responsibility principle
- Use proper prop types
- Implement error boundaries where appropriate

```typescript
// Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use semantic class names for custom CSS
- Maintain consistent spacing and typography

```tsx
// Good
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
  <p className="text-gray-600">Description</p>
</div>
```

### File Organization

```
src/
├── app/                    # Next.js app router pages
├── components/             # Reusable components
│   ├── ui/                # Basic UI components
│   └── ResumeBuilder/     # Feature-specific components
├── lib/                   # Utility libraries
├── utils/                 # Helper functions
└── types/                 # TypeScript type definitions
```

### Naming Conventions

- **Files**: Use kebab-case for files (`resume-builder.tsx`)
- **Components**: Use PascalCase (`ResumeBuilder`)
- **Functions**: Use camelCase (`parseResumeData`)
- **Constants**: Use UPPER_SNAKE_CASE (`API_ENDPOINTS`)

## 🧪 Testing

### Writing Tests

- Write unit tests for utility functions
- Write integration tests for components
- Test edge cases and error conditions
- Maintain good test coverage

```typescript
// Example test
describe('parseResumeData', () => {
  it('should parse valid resume data correctly', () => {
    const input = { name: 'John Doe', email: 'john@example.com' };
    const result = parseResumeData(input);
    
    expect(result.personalInfo.name).toBe('John Doe');
    expect(result.personalInfo.email).toBe('john@example.com');
  });
});
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📚 Documentation

- Update README.md for significant changes
- Add JSDoc comments for complex functions
- Update API documentation for new endpoints
- Include examples in documentation

```typescript
/**
 * Analyzes resume content for ATS compatibility
 * @param resumeContent - The resume text content
 * @param jobDescription - The target job description
 * @returns Promise<ATSAnalysisResult> - Analysis results with score and suggestions
 */
async function analyzeResume(
  resumeContent: string, 
  jobDescription: string
): Promise<ATSAnalysisResult> {
  // Implementation
}
```

## 🔍 Code Review Process

### For Contributors

- Ensure your code follows our standards
- Write clear commit messages
- Respond to feedback promptly
- Be open to suggestions and improvements

### For Reviewers

- Be constructive and respectful
- Focus on code quality and maintainability
- Check for security issues
- Verify tests pass and coverage is maintained

## 🏷️ Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(auth): add Google OAuth integration
fix(resume): resolve PDF export formatting issue
docs(api): update endpoint documentation
style(components): improve button component styling
refactor(utils): optimize ATS analysis algorithm
test(builder): add unit tests for resume builder
chore(deps): update dependencies to latest versions
```

## 🚀 Release Process

1. **Version Bump**: Update version in `package.json`
2. **Changelog**: Update `CHANGELOG.md` with new features and fixes
3. **Testing**: Ensure all tests pass
4. **Documentation**: Update documentation as needed
5. **Release**: Create a new release on GitHub

## 🆘 Getting Help

If you need help or have questions:

- Check existing [GitHub Issues](https://github.com/sidewayzAITsolutions/SmartATS-Resume/issues)
- Join our [Discord community](https://discord.gg/smartats)
- Email us at [dev@smartats.com](mailto:dev@smartats.com)

## 🎯 Areas for Contribution

We especially welcome contributions in these areas:

### High Priority
- **ATS Analysis Engine**: Improve accuracy and add new ATS systems
- **Template System**: Create new industry-specific templates
- **Performance**: Optimize loading times and user experience
- **Accessibility**: Improve WCAG compliance
- **Mobile Experience**: Enhance mobile responsiveness

### Medium Priority
- **Internationalization**: Add support for multiple languages
- **Testing**: Increase test coverage
- **Documentation**: Improve developer and user documentation
- **SEO**: Enhance search engine optimization

### Good First Issues
- Fix typos in documentation
- Add new icons or improve existing ones
- Improve error messages
- Add unit tests for utility functions
- Update dependencies

## 📊 Project Metrics

We track several metrics to ensure project health:

- **Code Coverage**: Aim for >80%
- **Performance**: Lighthouse score >90
- **Accessibility**: WCAG AA compliance
- **Bundle Size**: Keep under reasonable limits
- **Dependencies**: Regular security updates

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Annual contributor highlights
- Special badges for long-term contributors

Thank you for contributing to SmartATS Resume! Together, we're helping job seekers land their dream jobs by beating the ATS systems.

---

*For questions about contributing, please reach out to our maintainers or create an issue.*
