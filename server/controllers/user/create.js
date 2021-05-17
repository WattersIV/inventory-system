import { db } from '../../db/db.js'
import jwt from 'jsonwebtoken'

export const createNewUser = async (
  req,
  res,
  next
) => {
  console.log('create user')
  const { username, password } = req.body
  // If no usename or password return 400 promt user to fill it in 
  if (!username || !password) res.status(400).json({ message: 'Missing username or password' })

  //Needs to check if username exists first then hash pswd and use hashed pswd 
  //for inserting in the db and creating access token

  try {
    const [id] = await db('user')
      .insert({
        username,
        password
      })
      .returning('id')
    const user = {
      username,
      password
    }
    await createAccessToken(user)
    res.status(201).json({ id })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const createAccessToken = async (user) => {
  //Setting jwt with no expiry
  return jwt.sign(user, 'secret')
}