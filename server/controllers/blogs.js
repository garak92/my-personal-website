const Blogs = require('../models/Blogs')

const get = async (req, res) => {
  try {
    const data = await Blogs.find()
    return res.status(200).json({ data })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const getId = async (req, res) => {
  try {
    const { id } = req.params
    const record = await Blogs.findById(id)
    if (!record) {
      return res.status(400).json({ msg: 'Record does not exist...' })
    }
    return res.status(200).json({ record })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const post = async (req, res) => {
  try {
    const { title, content } = req.body
    if (!title || !content) {
      return res.status(400).json({ msg: 'Please, enter all the required fields' })
    }
    const data = new Blogs({
      title,
      content
    })

    await data.save()
    return res.status(200).json({ data })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const edit = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content } = req.body
    const record = await Blogs.findById(id)
    if (!record) {
      return res.status(400).json({ msg: 'Record does not exist. Edit fails...' })
    }
    await Blogs.findOneAndUpdate({ _id: id }, { title, content })
    return res.status(200).json({ msg: 'Record edited!' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const del = async (req, res) => {
  try {
    const { id } = req.params
    const record = await Blogs.findById(id)
    if (!record) {
      return res.status(400).json({ msg: 'Record does not exist. Delete fails...' })
    }
    await Blogs.findOneAndDelete({ _id: id })
    return res.status(200).json({ msg: 'Record deleted!' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

module.exports = { get, post, edit, del, getId }
