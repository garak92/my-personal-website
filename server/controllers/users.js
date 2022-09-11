const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

const post = async () => {
  try {
    const userExists = await Users.findOne({ name: 'admin' })

    if (userExists) {
      return
    }

    const password = 'admin'

    const user = new Users({
      password
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()
    console.log('User admin created')
    return
  } catch (err) {
    console.error('Could not create user admin: ', err.message)
  }
}

const changePassword = async (req, res) => {
  try {
    const { oldpassword, newpassword } = req.body

    const user = await Users.findOne({ name: 'admin' })

    if (!user) {
      return res.status(400).json({ msg: 'User does not exist!' })
    }

    if (!newpassword) {
      return res.status(400).json({ msg: 'Please, enter all required fields' })
    }

    const passwordsMatch = await bcrypt.compare(oldpassword, user.password)

    if (!passwordsMatch) {
      return res.status(400).json({ msg: 'Current password is incorrect, please try again' })
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newpassword, salt)

    await user.save()

    return res.status(200).json({ msg: 'Password changed successfully!' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { password } = req.body

    const user = await Users.findOne({ name: 'admin' })

    if (!user) {
      return res.status(400).json({ msg: 'User does not exist!' })
    }

    if (!password) {
      return res.status(400).json({ msg: 'Please, enter all required fields' })
    }

    const passwordIsValid = await bcrypt.compare(password, user.password)

    if (!passwordIsValid) {
      return res.status(401).json({ msg: 'Authentication error: password incorrect!' })
    }

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      {
        expiresIn: '1h'
      }
    )

    user.token = token
    await user.save()

    return res.status(200).json({ msg: 'Logged in successfully!', token: user.token })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

module.exports = { post, changePassword, login }
