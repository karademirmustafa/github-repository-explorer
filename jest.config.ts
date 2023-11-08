export default {
    roots: ["<rootDir>/src/__tests__"],
  
    transform: {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.jsx?$": "babel-jest" // Babel dönüşümünü ekleyin
    },
  
 
  
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testEnvironment: "jsdom",
  };
  