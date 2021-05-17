import { db } from '../../db/db.js'
import jwt from 'jsonwebtoken'
import crypto from "crypto";

export const createNewUser = async (
  req,
  res,
  next
) => {
  console.log('create user')
  const { username, rawPassword } = req.body
  // If no usename or password return 400 promt user to fill it in 
  if (!username || !rawPassword) res.status(400).json({ message: 'Missing username or password' })

  //Needs to check if username exists first then hash pswd and use hashed pswd 
  //for inserting in the db and creating access token
  const password = await hashPassword(rawPassword)
  try {
    const response = await db('user')
      .insert({
        username,
        password
      })
      .returning('id')
    const user = {
      username,
      password
    }
    const token = await createAccessToken(user)
    res.status(201).json({ token })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const createAccessToken = async (user) => {
  //Setting jwt with no expiry
  return jwt.sign(user, 'secret')
}

export const hashPassword = async (rawPassword) => {
  console.log("hash password");
  return new Promise(function (resolve, reject) {
    const salt = Buffer.from(
      Array(32)
        .fill(0)
        .map(() => Math.random() * 128)
    );
    crypto.scrypt(rawPassword, salt, 64, (err, derivedKey) => {
      if (err) {
        throw err;
      } else {
        resolve(salt.toString("hex") + ":" + derivedKey.toString("hex"));
      }
    });
  });
}