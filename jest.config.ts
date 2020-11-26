export default {
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    'pages/(.*)': '<rootDir>/pages/$1',
    'components/(.*)': '<rootDir>/components/$1',
    'services/(.*)': '<rootDir>/services/$1',
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    // '**/?(*.)+(test|spec).[tj]s?(x)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
}
