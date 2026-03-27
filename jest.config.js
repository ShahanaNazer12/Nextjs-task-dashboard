const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "jsdom", 
  transform: {
    ...tsJestTransformCfg,
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

 
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  
  transformIgnorePatterns: ["/node_modules/"],
};