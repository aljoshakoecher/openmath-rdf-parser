/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
	collectCoverage: true,
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!**/node_modules/**",
		"!**/dist/**"
	],
	coverageDirectory: "coverage",
	coverageReporters: ["text", "lcov"],
};