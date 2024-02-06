module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    '^antd/es/input/Search$': 'antd/lib/input/Search',
  }
};
