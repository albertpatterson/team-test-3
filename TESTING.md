# Testing Documentation

This project includes comprehensive tests for the React Router application components.

## Test Setup

The project uses:
- **Vitest** - Fast test runner
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom DOM matchers
- **jsdom** - DOM environment for testing

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

### Home Component Tests
- `app/routes/home.test.tsx` - Unit tests with mocked dependencies
- `app/routes/home.integration.test.tsx` - Integration tests with full rendering

### Welcome Component Tests
- `app/welcome/welcome.test.tsx` - Comprehensive component tests
- `app/welcome/welcome.interaction.test.tsx` - User interaction and accessibility tests
- `app/welcome/welcome.snapshot.test.tsx` - Snapshot tests for regression detection

## Test Coverage

The tests cover:
- ✅ Component rendering
- ✅ User interactions
- ✅ Accessibility features
- ✅ External links and navigation
- ✅ Dark mode styling
- ✅ Responsive design
- ✅ Meta function exports
- ✅ Error handling
- ✅ Semantic HTML structure

## Test Philosophy

1. **Unit Tests** - Test individual components in isolation with mocked dependencies
2. **Integration Tests** - Test components with their real dependencies
3. **Accessibility Tests** - Ensure components work with screen readers and keyboards
4. **Snapshot Tests** - Catch unintended visual regressions
5. **Interaction Tests** - Test user workflows and behaviors

## Test Files Summary

- **29 total tests** across 5 test files
- All tests passing ✅
- Comprehensive coverage of home page and welcome component functionality
