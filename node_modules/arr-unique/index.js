'use strinct'

const equals = require('deep-equal')

module.exports = (...arr) => {
  if (!Array.isArray(arr)) {
    throw new TypeError(`Expected an Array but got ${typeof arr}.`)
  }

  return [].concat(...arr).reduce((acc, val) => {
    return acc.concat(acc.find(a => equals(a, val)) === undefined ? val : undefined)
  }, []).filter(u => u !== undefined)
}
