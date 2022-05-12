module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,jsx}"],
  coverageDirectory: "<rootDir>/coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
};
