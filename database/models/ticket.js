const Sequelize = require('sequelize')
const util = require('../../util')
const database = require('../connection')
const bcrypt = require('bcrypt')

const Ticket = database.define('ticket', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  code: {
    type: Sequelize.STRING
  }
})

Ticket.generateCode = async () => {
  const codesCount = await Ticket.getCodesCount()
  if (codesCount >= util.limit()) {
    return new Error('Maximum number of available codes was reached.')
  }
  const code = util.createCode()
  const takenCode = await database.models.ticket.findOne({where: {code}})

  if (takenCode !== null) {
    Ticket.generateCode()
  }
  return code
}

Ticket.getCodesCount = async () => {
  const count = await database.models.ticket.count()
  return count
}

Ticket.access = async (username, password, code) => {
  const access = await database.models.ticket.findOne({where: {username, code}})

  if (!access) {
    return new Error('User, password and ticket code combination not found.')
  }

  const passwordValidate = await bcrypt.compare(password, access.password)
  if (!passwordValidate) return new Error('Password incorrect.')
  return true
}

Ticket.save = async (username, password) => {
  try {
    const code = await Ticket.generateCode()
    if (code instanceof Error) {
      return new Error(code.message)
    }

    const ticket = await database.models.ticket.create({username, password, code})
    return {ticket, code}
  } catch (e) {
    return new Error(e.message)
  }
}

module.exports = Ticket
