import Joi from 'joi'
import { CREATED_AS } from '../types/shared.interface'

const minLength = 3
const maxLength = 30

export const authSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(minLength).max(maxLength).required(),
  createdAs: Joi.string()
    .valid(CREATED_AS.CUSTOMER, CREATED_AS.SELLER)
    .required()
})
