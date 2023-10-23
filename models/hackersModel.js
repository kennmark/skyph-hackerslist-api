import mongoose from 'mongoose'

const hackerSchema = mongoose.Schema(
  {
    fbname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    isHacker: {
      type: String,
      required: true,
    },
    group: {
      type: String,
    },
    position: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const Hacker = mongoose.model('Hacker', hackerSchema)
