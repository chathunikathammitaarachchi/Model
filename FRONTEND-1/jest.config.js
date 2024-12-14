

export default {
  testEnvironment: 'jsdom',  // Simulate the browser environment
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',  // Tells Jest to use babel-jest for transpiling JS and JSX files
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],  // For extended DOM matchers in tests
};
