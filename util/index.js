module.exports = {
  characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '23456789',
  m: 2,
  createCode () {
    const A = this.pickRandom(this.characters)
    const B = this.pickRandom(this.characters)
    const C = this.pickRandom(this.numbers)
    const D = this.pickRandom(this.numbers)

    return `${A}${B}-${C}${D}`
  },
  limit () {
    return Math.pow(this.characters.length, this.m) * Math.pow(this.numbers.length, this.m)
  },
  pickRandom (str) {
    return str.charAt(Math.floor(Math.random() * str.length))
  }
}
