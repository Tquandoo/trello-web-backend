
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().message({
      'any.required': 'Title is required tquandoo',
      'string.empty': 'Title is not allowed to be empty tquandoo',
      'string.min':'Title length must be at least 3 characters long tquandoo',
      'string.max': 'Title length must be less than or equal to 5 characters long',
      'string.trim': 'Title must not have leading or trailing whitespace tquandoo'
    }),
    description: Joi.string().required().min(3).max(250).trim().strict(),
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false }) // abortEarly là validate có bị dừng sớm không
    next()
  }
  catch (e) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(e).message
    })
  }
}
  

export const boardValidation = {
  createNew
}