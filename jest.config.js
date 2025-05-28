const nextJest = require('next/jest')

const createJestCOnfig = nextJest()
const jestConfig = createJestCOnfig({
  moduleDirectories: ['node_modules', '<rootDir>']
})

module.exports = jestConfig
