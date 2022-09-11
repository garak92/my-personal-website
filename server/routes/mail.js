const express = require('express');
const mailRouter = express.Router();
const sendMail = require('../controllers/mail');

mailRouter.post('/sendmail', (req, res) => {
  try {
    const { content } = req.body
    sendMail(content)
    return res.status(200).json({ msg: 'Mail sent!' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
});

module.exports = mailRouter;