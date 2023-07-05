import { z } from 'zod'

const usernameSchema = z
  .string()
  .min(3, { message: 'Password must be at least 3 characters long' })
  .max(50)

const emailSchema = z.string().email({
  message: 'Please enter a valid email address',
})

const passwordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters long' })
  .max(100)
  .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/, {
    message: 'Password must contain at least 6 characters and one number',
  })

export const signUpSchema = z.object({
  email: emailSchema,
  // username: usernameSchema,
  password: passwordSchema,
})

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})
