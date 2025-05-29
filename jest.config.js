const dotenv = require('dotenv')
const nextJest = require('next/jest')

dotenv.config({
  path: '.env.development'
})

const createJestCOnfig = nextJest({
  dir: './'
})

const jestConfig = createJestCOnfig({
  moduleDirectories: ['node_modules', '<rootDir>']
})

module.exports = jestConfig
