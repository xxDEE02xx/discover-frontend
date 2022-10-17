const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  moduleDirectories: ['node_modules', 'src'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  testPathIgnorePatterns: [
    '<rootDir>/setupTests.js',
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  testMatch: ['**/*.test.+(ts|tsx|js|jsx)'],
  testResultsProcessor: '<rootDir>/node_modules/jest-html-reporter',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx,js,jsx}'],
  coverageReporters: ['lcov'],
  coverageDirectory: './coverage/',
  reporters: ['default', '<rootDir>/node_modules/jest-html-reporter'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/common/utils/test/*',
    '<rootDir>/src/common/test/*',
    '<rootDir>/src/components/BackgroundLottie/*',
    '<rootDir>/src/components/Link/*',
    '<rootDir>/src/assets/*',
    '<rootDir>/src/common/createEmotionCache.ts',
    '<rootDir>/src(/.*)?/index.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/components/$1',

    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
