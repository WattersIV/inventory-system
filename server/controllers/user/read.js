import { db } from '../../db/db.js'
import jwt from 'jsonwebtoken'
import crypto from "crypto";
import { createAccessToken } from './create.js'
import {} from 'dotenv/config'

export const login = async (
  req,
  res,
  next
) => {
  console.log('login')
  const { username, rawPassword } = req.body
  //If missing creditentials send 400 and promt user
  if (!username || !rawPassword) return res.staus(400).json({ message: 'Missing username or password' })

  try {
    //Checking if username exists and grabbing password
    const response = await db('user')
      .select('password', 'id')
      .where({
        username
      })
      const { password, id } = response[0]
    //Check if password matches one found for that user
    try {
      await verifyPassword(rawPassword, password)

      //create an access token and send it to user if pass matches
      const user = {
        name: username,
        password,
      }
      const accessToken = await createAccessToken(user)
      res.status(200).json({ accessToken })
    } catch (err) {
      //Invalid password
      res.status(401).json({ message: 'Invalid Credientals' })
    }
  } catch (err) {
    res.send(500).json({ message: err })
  }
}

export const verifyAccessToken = async (
  req,
  res,
  next
) => {
  console.log('authenticating token')
  const authHeader = req.headers['authorization']
  //If no header make token null
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) return sendStatus(401)

  jwt.verify(token, `${process.env.JWT_KEY}`, (err, user) => {
    //Invalid token
    if (err) return res.sendStatus(403)
    //valid token
    next()
  })
}

export const verifyPassword = (rawPassword, hashedPassword) => {
  console.log("verify password");
  return new Promise(function (resolve, reject) {
    const splited = hashedPassword.split(":");
    const dbSalt = Buffer.from(splited[0], "hex");
    const dbPassword = splited[1];
    const hashedInputPassword = crypto
      .scryptSync(rawPassword, dbSalt, 64)
      .toString("hex");
    console.log(hashedInputPassword, dbPassword)
    if (hashedInputPassword === dbPassword) {
      resolve("success");
    } else {
      reject("Incorrect password");
    }
  });
}


export const checkIfUserExists = async (
  req,
  res,
  next
) => {
  console.log('check if user exists')
  const { username, rawPassword } = req.body
  //If no username or pass return 400 and promt user 
  if (!username || !rawPassword) res.status(400).json({ message: 'Missing credientals' })

  try {
    const response = await db('user')
      .select('*')
      .where({ username })
    //Case where there is a user already
    console.log(response)
    if (!response.length) return next()
    res.status(422).json({ message: 'Username already in use' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

