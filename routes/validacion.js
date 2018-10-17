const Ticket = require('../database/models/ticket')
const router = require('express').Router()

module.exports = router.post('/validacion', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const code = req.body.ticketCode

  if (!code) res.json({success: false, error: 'Ticket code is required.'})
  if (!username) res.json({success: false, error: 'Username is required.'})
  if (!password) res.json({success: false, error: 'Password is required.'})

  if (username && password && code) {
    const access = await Ticket.access(username, password, code)
    if (access instanceof Error) {
      res.json({success: false, error: access.message})
    } else {
      res.json({success: true, error: null})
    }
  }
})
