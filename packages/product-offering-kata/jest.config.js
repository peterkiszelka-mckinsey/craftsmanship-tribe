/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 90000,
  transform: {
    '.(ts|tsx)$': 'ts-jest',
  },
  rootDir: 'src',
};
