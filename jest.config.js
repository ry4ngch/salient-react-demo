module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // The test environment that will be used for testing
    testEnvironment: "jest-environment-jsdom",

    verbose: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",
    
    // Use v8 for better performance
    coverageProvider: "v8",

    // This is a basic example; adjust as needed for your file structure
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
    ],

    // A map from regex to module names that allow to stub out resources.
    // Useful for files like CSS or images in React apps.
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
};