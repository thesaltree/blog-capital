module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
    moduleDirectories: ['node_modules', 'src'],
};
