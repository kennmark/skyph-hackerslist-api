import express from 'express'
import { Hacker } from '../models/hackersModel.js'

const router = express.Router()

// Route for SAVE a new Hacker
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.fbname ||
      !request.body.username ||
      !request.body.status ||
      !request.body.isHacker
    ) {
      return response.status(400).send({
        message: 'Send all required fields: fbname, username, status, isHacker',
      })
    }
    const newHacker = {
      fbname: request.body.fbname,
      fbLink: request.body.fbLink,
      username: request.body.username,
      status: request.body.status,
      position: request.body.position,
      isHacker: request.body.isHacker,
      group: request.body.group,
      comment: request.body.comment,
    }
    const hacker = await Hacker.create(newHacker)
    return response.status(201).send(hacker)
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// Route for GET ALL Hackers from database
router.get('/', async (request, response) => {
  try {
    const hackers = await Hacker.find({})
    return response.status(200).json({
      count: hackers.length,
      data: hackers,
    })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// Route for GET SINGLE ITEM of Hackers from database
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const hacker = await Hacker.findById(id)
    return response.status(200).json(hacker)
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// Route for UPDATE a hacker
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.fbname ||
      !request.body.username ||
      !request.body.status ||
      !request.body.isHacker
    ) {
      return response.status(400).send({
        message: 'Send all required field: fbname, username, status, isHacker',
      })
    }
    const { id } = request.params
    const result = await Hacker.findByIdAndUpdate(id, request.body)

    if (!result) {
      return response.status(404).json({ message: 'Hacker not found!' })
    }

    return response
      .status(200)
      .json({ message: 'Hacker updated successfully!' })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// Route for DELETE a hacker
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const result = await Hacker.findByIdAndDelete(id)
    if (!result) {
      return response.status(404).json({ message: 'Hacker not found!' })
    }
    return response
      .status(200)
      .json({ message: 'Hacker deleted successfully!' })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

export default router
