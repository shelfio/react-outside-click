/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  modulePaths: ['<rootDir>/src'],
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageReporters: ['clover', 'text'],
  coveragePathIgnorePatterns: ['.stories.*', 'types.ts'],
  moduleNameMapper: {
    '\\.(css|scss|svg)$': 'identity-obj-proxy',
  },
  modulePathIgnorePatterns: ['__test__'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

export default config;
