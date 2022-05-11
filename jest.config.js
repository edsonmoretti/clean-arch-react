module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverage: ["<rootDir>/src/**/*.{ts,jsx}"],
  converageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
