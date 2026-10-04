/*
export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterSetup: ['<rootDir>/src/setupTests.ts'],
};
*/

export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: {
                    jsx: 'react-jsx', // Fixes "Cannot use JSX" error
                    esModuleInterop: true, // Fixes TS151001 warning
                },
            },
        ],
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterSetup: ['<rootDir>/src/setupTests.ts'], // Fixed typo: was setupFilesAfterSetup
};