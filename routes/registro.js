const bcrypt = require('bcrypt')
const Ticket = require('../database/models/ticket')
const router = require('express').Router()

module.exports = router.post('/registro', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const regex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/

  if (!username) res.json({success: false, error: 'Username is required.'})
  if (!password) res.json({success: false, error: 'Password is required.'})
  if (!regex.test(password)) res.json({success: false, error: 'Password must have at least eight characters, one upercase letter, and one number.'})

  if (username && password) {
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    const transaction = await Ticket.save(username, passwordHash)

    if (transaction instanceof Error) {
      res.json({success: false, error: transaction.message})
    } else {
      res.json({success: true, error: null, ticketCode: transaction.code})
    }
  }
})
