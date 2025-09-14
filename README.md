# Polyfills 🛠️

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)]()

Hey there! This project is all about practicing how to write your own JavaScript polyfills. Think of polyfills as little helpers that make sure your code works smoothly across different browsers and environments.

We're using Jest to test these polyfills and make sure they do their job correctly. So, you'll get hands-on experience with writing polyfills and testing them too!

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Footer](#footer)

## Description

This repository provides a set of custom JavaScript polyfills for various built-in methods, such as `Array.prototype.at`, `Array.prototype.filter`, `Array.prototype.map`, `Array.prototype.reduce`, `Function.prototype.apply`, `Function.prototype.bind`, and `Function.prototype.call`. Each polyfill is accompanied by a comprehensive test suite using Jest to ensure correctness and compatibility. This project serves as a learning and practice environment for understanding and implementing polyfills. 📚

## Features

- **Custom Polyfills**: Implementations for `Array.prototype.at`, `Array.prototype.filter`, `Array.prototype.map`, `Array.prototype.reduce`, `Function.prototype.apply`, `Function.prototype.bind`, and `Function.prototype.call`. ✨
- **Comprehensive Testing**: Each polyfill is thoroughly tested using Jest with various scenarios, including edge cases and error handling. ✅
- **ESM Support**: The project is configured to use ECMAScript modules (ESM). 📦

## Tech Stack

- [JavaScript](https://www.javascript.com/) 💻
- [Jest](https://jestjs.io/) 🃏

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/abhinavoo7/Polyfills.git
    cd Polyfills
    ```

2.  Install the dependencies using npm:

    ```bash
    npm install
    ```

## Usage

To use the polyfills, import them into your project. For example:

```javascript
import "./src/polyfills/array/at.js";

const arr = [1, 2, 3];
console.log(arr.customAt(1)); // Output: 2
```

### Running Tests

To run the tests, use the following command:

```bash
npm test
```

This command executes the Jest test suite with coverage reporting. The test configuration is defined in `jest.config.js`.

```javascript
export default {
  testEnvironment: "node",
  transform: {},
};
```

### Real-World Use Cases

This project can be used in several real-world scenarios:

- **Learning and Education**: A hands-on environment for understanding how built-in JavaScript methods work under the hood.
- **Compatibility**: Providing fallback implementations for newer JavaScript features in older environments.
- **Customization**: Modifying and extending existing JavaScript functionality with custom behavior.

## Project Structure

```
Polyfills/
├── jest.config.js        # Jest configuration file
├── package.json          # Project metadata and dependencies
├── src/
│   ├── polyfills/        # Directory containing polyfill implementations
│   │   ├── array/      # Array polyfills
│   │   │   ├── at.js       # Array.prototype.at polyfill
│   │   │   ├── filter.js   # Array.prototype.filter polyfill
│   │   │   ├── map.js      # Array.prototype.map polyfill
│   │   │   └── reduce.js   # Array.prototype.reduce polyfill
│   │   └── function/   # Function polyfills
│   │       ├── apply.js  # Function.prototype.apply polyfill
│   │       ├── bind.js   # Function.prototype.bind polyfill
│   │       └── call.js   # Function.prototype.call polyfill
│   └── tests/            # Directory containing test suites
│       ├── array/
│       │   ├── customAt.test.js       # Tests for Array.prototype.at polyfill
│       │   ├── customFilter.test.js   # Tests for Array.prototype.filter polyfill
│       │   ├── customMap.test.js      # Tests for Array.prototype.map polyfill
│       │   └── customReduce.test.js   # Tests for Array.prototype.reduce polyfill
│       └── function/
│           ├── customApply.test.js  # Tests for Function.prototype.apply polyfill
│           ├── customBind.test.js   # Tests for Function.prototype.bind polyfill
│           └── customCall.test.js   # Tests for Function.prototype.call polyfill
└──
```

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Implement your changes.
4.  Write tests to ensure your changes work correctly.
5.  Submit a pull request.

## Footer

---

Polyfills - [https://github.com/abhinavoo7/Polyfills](https://github.com/abhinavoo7/Polyfills) by Abhinav Gupta.

⭐ Give a star at [GitHub repository](https://github.com/abhinavoo7/Polyfills) and feel free to create issues and fork.

---
