const Projects = require('../models/Projects')

const get = async (req, res) => {
  try {
    const data = await Projects.find()
    return res.status(200).json({ data })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const getId = async (req, res) => {
  try {
    const { id } = req.params
    const record = await Projects.findById(id)
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
    const { name, description, link, source } = req.body
    if (!name || !description) {
      return res.status(400).json({ msg: 'Please, enter all the required fields' })
    }
    const data = new Projects({
      name,
      description,
      link,
      source
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
    const { name, description, link, source } = req.body
    const record = await Projects.findById(id)
    if (!record) {
      return res.status(400).json({ msg: 'Record does not exist. Edit fails...' })
    }
    await Projects.findOneAndUpdate({ _id: id }, { name, description, link, source })
    return res.status(200).json({ msg: 'Record edited!' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

const del = async (req, res) => {
  try {
    const { id } = req.params
    const record = await Projects.findById(id)
    if (!record) {
      return res.status(400).json({ msg: 'Record does not exist. Delete fails...' })
    }
    await Projects.findOneAndDelete({ _id: id })
    return res.status(200).json({ msg: 'Record deleted!' })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

module.exports = { get, post, edit, del, getId }
