require('dotenv').config()

module.exports = {
  pluck: (arr, key) => {
    return arr.map(i => i[key])
  },
  intToAZ: (num) => {
    let result = '';
    while (num > 0) {
      const remainder = (num - 1) % 26;
      result = String.fromCharCode(65 + remainder) + result;
      num = Math.floor((num - remainder) / 26);
    }
    return result;
  },
}
