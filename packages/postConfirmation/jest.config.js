/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    roots: ["<rootDir>/tests"],
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
};
